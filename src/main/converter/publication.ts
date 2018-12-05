import { injectable } from "inversify";

import * as moment from "moment";

import { JSON as TAJSON } from "ta-json-x";

import { Publication as Epub } from "@r2-shared-js/models/publication";

import { PublicationView } from "readium-desktop/common/views/publication";

import { PublicationDocument } from "readium-desktop/main/db/document/publication";

@injectable()
export class PublicationViewConverter {
    public convertDocumentToView(document: PublicationDocument): PublicationView {
        const b64ParsedPublication = document.resources.filePublication;
        const jsonParsedPublication = Buffer
            .from(b64ParsedPublication, "base64")
            .toString("utf-8");
        const parsedPublication = JSON.parse(jsonParsedPublication);
        const epub = TAJSON.deserialize(parsedPublication, Epub) as Epub;
        const publishers = this.convertContibutorArrayToStringArray(
            epub.Metadata.Publisher,
        );
        const authors = this.convertContibutorArrayToStringArray(
            epub.Metadata.Author,
        );
        let publishedAt = null;

        if (epub.Metadata.PublicationDate) {
            publishedAt = moment(epub.Metadata.PublicationDate).toISOString()
        }

        let cover = null;

        if (document.coverFile) {
            cover = {
                url : document.coverFile.url,
            };
        }

        return {
            identifier: document.identifier,
            title: document.title,
            authors,
            languages: epub.Metadata.Language,
            publishers,
            workIdentifier: epub.Metadata.Identifier,
            publishedAt,
            tags: document.tags,
            cover,
            customCover: document.customCover,
        };
    }

    private convertContibutorArrayToStringArray(items: any): string[] {
        if (!items) {
            return  [];
        }

        const itemParts = items.map((item: any) => {
            if (typeof(item.Name) == "object") {
                return Object.values(item.Name);
            }

            return [item.Name];
        });

        let newItems: any = [];

        for (const itemPart of itemParts) {
            newItems = newItems.concat(itemPart);
        }

        return newItems;
    }
}
