import { Button, Col, Container, Grid, Panel, Row } from "rsuite";
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../misc/firebase";
import { database } from "../misc/firebase";
import { ref, set } from "firebase/database";
import { toast, ToastContainer } from 'react-toastify';


const SignIn = () => {
    const signInWithProvider = async (provider) => {
        try{
            const result = await signInWithPopup(auth, provider);

            if(result._tokenResponse.isNewUser){   
                await set(ref(database, "profiles/" + result.user.uid), {
                    name: result.user.displayName,
                    email: result.user.email
                });
            }

            toast.success("Login Successful")
        }
        catch(err){
            toast.error(err)
        }
    }

    const onGoogleSignIn = () => {
        signInWithProvider(new GoogleAuthProvider());
    }

    const onFacebookSignIn = () => {
        signInWithProvider(new FacebookAuthProvider());
    }

    return (
        <Container>
            <Grid>
                <Row>
                    <Col xs={24} md={12} mdOffset={6}>
                        <Panel>
                            <div className="text-center mt">
                            <h2 className="text-center">Welcome To Chat App</h2>
                                <div className="mt-5">
                                    <Button color="green" appearance="primary" startIcon={<FaGoogle />} className="mlr-3" onClick={onGoogleSignIn}>
                                        Login with Google
                                    </Button>
                                    <Button color="blue" appearance="primary" startIcon={<FaFacebook />} className="mlr-3" onClick={onFacebookSignIn}>
                                        Login with Facebook
                                    </Button>
                                </div>
                            </div>
                            <ToastContainer position="top-center"/>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        </Container>
    );
}

export default SignIn;