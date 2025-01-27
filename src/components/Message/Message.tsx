import "./Message.css"
import {Info} from "lucide-react";

interface MessageProps {
    message: string;
    type: string;
}
export default function Message(props: MessageProps) {
    return(
        <>
        <div className={props.type}>
            <Info style={{marginRight:"10px"}}/>
            {props.message}
        </div>
        </>
    )
}