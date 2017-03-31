import React from 'react';


class SubHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        let settings = this.props;
        return (
            <div className="jumbotron ">
                {settings.showNextSemesterMsg ? <h2>{settings.nextSemesterMsg}</h2> : <span>Join a Mosaic Growth Group</span>}
            </div>

        );
    }
}




export default SubHeader;