import React from "react";

const FooterFixedButton = () => {
    return (
        <>
            <div className="fixbtn">
                <a href="#" className="scrollToTop">
                    <i className="fas fa-angles-up" />
                </a>
                <a target={"_blank"} href={`https://api.whatsapp.com/send?phone=+91987654321&text=Hi, I'm a visitor of NavTatva`} className="whatsapp">
                    <i className="fa-brands fa-whatsapp" />
                </a>
            </div>
        </>
    )
}

export default FooterFixedButton;