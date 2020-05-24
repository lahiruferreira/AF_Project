import React, {Component} from "react";
import Alert from "react-bootstrap/Alert";
import "./AlertStyles.css";

class ToastMessage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            message: '',
            messageType: 'Error',
            statusColor: 'danger'
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            show: nextProps.showToast,
            message: nextProps.message,
            messageType: nextProps.messageType,
            statusColor: nextProps.statusColor
        });
    }


    render() {

        if (this.state.show) {
            return (
                <div className="fixed-bottom" id={this.props.tId}>

                    <Alert variant={this.state.statusColor} onClose={() => this.props.showFunction(false)} dismissible>
                        <Alert.Heading>{this.state.messageType}</Alert.Heading>
                        <p>{this.state.message}</p>
                    </Alert>


                </div>

            );
        }

        return (<></>);
    }


}

export default ToastMessage;