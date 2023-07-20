import { Divider, Header } from "semantic-ui-react";
import './auth/styles.css'
import MenuNav from "./MenuNav";

export default function NotFound() {
    return (
        <>
            <div className="ui container center aligned holding">
                <div className="container">
                    <h1 className="big404">404</h1>
                    <h1 className=" nopage">
                        This isn't a page...yet
                    </h1>
                    <Divider></Divider>
                    <p className="nopage2">Try another :)</p>
                </div>
            </div>
        </>
    );
}