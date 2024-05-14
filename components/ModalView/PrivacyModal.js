import React from "react";
import "react-responsive-modal/styles.css";
//npm install react-responsive-modal
import { Modal } from "react-responsive-modal";

const PrivacyModal = (props) => {
    const [open, setOpen] = React.useState(false);
    const policyText = (
        <p>
            At TheWheelHouse, we respect your personal data. We have never sold your information to someone else for advertising, 
            or made money by showing you other people's ads, and we never will. This has been our approach for almost 20 years, 
            and we remain committed to it. This policy tells you what information we do collect from you, what we do with it, 
            who can access it, and what you can do about it.
        </p>
    );
    return (
        <>
            <button className="item1" onClick={() => setOpen(true)}>
                Privacy Policy
            </button>
            <Modal open={open} onClose={() => setOpen(false)} center>
                <h2>Privacy Policy</h2>
                {policyText}
                {policyText}
                {policyText}
            </Modal>
        </>
    );
};

export default PrivacyModal;
