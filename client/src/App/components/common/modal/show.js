
// this function must be bound before use
// ie:  this.show = show.bind(this);
export default function (innerHtml) {
    let self = this;
    // each time we show the dialoge box, we want to return a new Promise
    // this promise will be rejected on cancel and fulfilled on accept
    return new Promise((resolve, reject) => {
        self.setState({ show: true, innerHtml });
        self.accept = () => {
            self.setState({ show: false, innerHtml: null });
            resolve();
        };
        self.cancel = () => {
            self.setState({ show: false, innerHtml: null });
            reject();
        };
    });
}