export default function Greetee(props) {
    console.log('props: ', props);

    return (
        <div>
            {props.person || "backup name"}
        </div>
    );
}
