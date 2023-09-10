import { currentDate } from "../utils/functions.utils";

const NavbarComponent = ()=> {
    return (<div>
        <div>
            Today: {currentDate()}</div>
    </div>)
}

export default NavbarComponent;