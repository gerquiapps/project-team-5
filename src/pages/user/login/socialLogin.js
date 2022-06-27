// import { languages } from '../../language';
import { app } from '../../../firebase/firebase';
import { getAuth, signInWithPopup, linkWithPopup } from "firebase/auth";
import { SOCIAL_CONFIG } from '../../../constants/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-social/bootstrap-social.css';
import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider } from "firebase/auth";

function SocialLogin(props) {
    // const _language = languages['en'];
    const { dark } = true;
    const style = dark ? "bg-dark text-white" : "bg-light text-dark";
    const socialConfig = SOCIAL_CONFIG;

    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const twitterProvider = new TwitterAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const socialLogin = (e, provider) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;
                console.log(user);
                let token = await user.getIdToken();
                let names = user.displayName.split(' ');
                let userToStore = {
                    _id: user.uid,
                    email: user.email,
                    username: user.email,
                    name: names[0],
                    lastName: names[1] || '',
                    isLogged: true,
                    password: '',
                    phone: '',
                    picture: '',
                    role: 'user',
                    token: token,
                    error: null,
                    hasSocialLogin: true
                };
                props.handleSubmit(userToStore);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }
    return (
        <div>
            {(socialConfig.google) ?
                <button className="btn btn-block btn-social btn-google" style={{ width: '220px', color: 'white  ' }} onClick={(e) => socialLogin(e, googleProvider)}>
                    <span className="fa fa-google"></span>Iniciar con Google
                </button>
                : <> </>
            }
        </div >
    );
}

export default SocialLogin;