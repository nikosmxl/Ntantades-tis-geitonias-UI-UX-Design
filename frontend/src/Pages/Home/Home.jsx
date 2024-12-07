import s from "./HomeStyle.module.css"
import WelcomeNavBar from "../../Components/WelcomeNavBar/WelcomeNavBar"


function Home(){
    return (
        <div className={s.container}>
            <WelcomeNavBar/>
            <div className={s.home_page}>
                <div className={s.background_pic}>

                </div>
            </div>
        </div>
    )
}

export default Home;