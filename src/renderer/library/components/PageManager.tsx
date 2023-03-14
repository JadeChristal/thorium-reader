// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "readium-desktop/renderer/library/routing";
import { ObjectKeys } from "readium-desktop/utils/object-keys-values";
import Login from "./login/Login";
import PrivateRoutes from "./PrivateRoute";

interface IState {
    activePage: number;
    isAuthenticated: boolean;
}

export default class PageManager extends React.Component<{}, IState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            activePage: 0,
            isAuthenticated: true,
        };
    }

    public render(): React.ReactElement<{}> {
        return (
            <Routes>
                <Route key="login" path="/login" element={<Login/>}/> 
                {
                    ObjectKeys(routes).map(
                        (path) =>
                        { 
                            const Component = routes[path].component;

                            return <Route
                                key={path}
                                path={routes[path].path}
                                element={<PrivateRoutes isAuthenticated={this.state.isAuthenticated} ><Component/> </PrivateRoutes>}
                            />;
                        },
                    )
                }
            </Routes>
        );
    }
}
