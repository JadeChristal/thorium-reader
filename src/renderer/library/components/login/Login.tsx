import React from "react";
import { ILibraryRootState } from "readium-desktop/renderer/library/redux/states";
import { connect } from "react-redux";
import {withTranslator,
} from "readium-desktop/renderer/common/components/hoc/translator";

class Login extends React.Component {
    public render(): React.ReactElement<{}> {

console.log("login");

        return (
<p>login</p>
        );
    }
}

const mapStateToProps = (state: ILibraryRootState) => ({
    location: state.router.location,
});

export default connect(mapStateToProps)(withTranslator(Login));
