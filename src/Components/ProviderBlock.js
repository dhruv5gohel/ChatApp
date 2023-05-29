import { useState } from "react"
import { AiFillFacebook, AiOutlineGoogle } from "react-icons/ai"
import { Button, Tag, TagGroup } from "rsuite"
import { auth } from "../misc/firebase"
import { toast } from "react-toastify"
import { FacebookAuthProvider, GoogleAuthProvider, linkWithPopup, unlink } from "firebase/auth"

const ProviderBlock = () => {
    const [isConnected, setIsConnected] = useState({
        "google.com": auth.currentUser ? auth.currentUser.providerData.some(data => data.providerId === "google.com") : false,
        "facebook.com": auth.currentUser ? auth.currentUser.providerData.some(data => data.providerId === "facebook.com") : false
    })

    const updateIsConnected = (provider, value) => {
        setIsConnected(p => {
            return {
                ...p, 
                [provider]: value
            }
        })
    }

    const unlinkProvider = async (provider) => {
        try{
            if(auth.currentUser.providerData.length === 1){
                throw new Error("There must be one provider connected");
            }

            await unlink(auth.currentUser, provider);

            toast.success(`Logged out from ${provider}`);
            updateIsConnected(provider, false)
        }
        catch(err){
            toast.error(err.message);
        }
    }

    const linkProvider = async (provider) => {
        try{
            await linkWithPopup(auth.currentUser, provider);

            toast.success(`Linked with ${provider.providerId}`);
            updateIsConnected(provider.providerId, true)
        }
        catch(err){
            toast.error(err);
        }
    }

    const unlinkGoogle = () => {
        unlinkProvider("google.com")
    }

    const unlinkFacebook = () => {
        unlinkProvider("facebook.com")
    }

    const linkGoogle = () => {
        linkProvider(new GoogleAuthProvider());
    }

    const linkFacebook = () => {
        linkProvider(new FacebookAuthProvider());
    }

  return (
    <div className="mt-5">
      <TagGroup>
      {isConnected["google.com"] &&
        <Tag closable color="green" onClose={unlinkGoogle}>
            <AiOutlineGoogle /> Connected
        </Tag>
      }

      {isConnected["facebook.com"] && 
        <Tag closable color="blue" onClose={unlinkFacebook}>
            <AiFillFacebook /> Connected
        </Tag>
      }
      </TagGroup>

      {!isConnected["google.com"] &&
      <Button startIcon={<AiOutlineGoogle />} color="green" block className="provider-btn" appearance="primary" onClick={linkGoogle}>
        Link To Google
      </Button>
      }

      {!isConnected["facebook.com"] && 
      <Button startIcon={<AiFillFacebook />} color="blue" block className="provider-btn" appearance="primary" onClick={linkFacebook}>
        Link To Facebook
      </Button>
      }
    </div>
  )
}

export default ProviderBlock
