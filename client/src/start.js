import ReactDOM from "react-dom";

ReactDOM.render(<HelloWorld />, document.querySelector("main"));

function HelloWorld() {
    return <div>
        Hello, <Greetee person={"al"} />!
        Hello, <Greetee person={"bob"} />!
        Hello, <Greetee person={"amy"} />!
    </div>;
}
