import React from "react";
import FooterFixedButton from "../../themes/themeOne/components/FooterFixedButton";
import FooterDetail from "./FooterDetail";

const Footer = () => {

  const handleSubmit = (e) => {
    e.prevent.default();
  }
  return (
    <>
      <footer className="footer">
        <div className="wrapper">
          <div className="row">
            <div className="col-md-12 col-lg-4">
              <div className="footer-area">
                <h2>Newsletter</h2>
                <p>
                  Get every product update and new offers as soon as they are
                  available.
                </p>
                <form className="position-relative mt-5" action="#">
                  <div className="form-group mb-2">
                    <label htmlFor="staticEmail2" className="sr-only">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control text-color-1"
                      id="staticEmail2"
                    />
                  </div>
                  <button type="button" className="btn btn-primary mb-2">
                    Confirm identity
                  </button>
                </form>
              </div>

            </div>
            <div className="col-md-6 col-lg-3 offset-md-0 offset-lg-1 mt-4 mt-lg-0">
              <div className="footer-area mb-5">
                <h2>Contact Us</h2>
                <p>
                  <a href="mailto:support@navtatva.com">support@navtatva.com</a>
                </p>
                <p>
                  <a href="tel:73892 73884">+91 73892 73884</a>
                </p>
              </div>
              <div className="footer-area">
                <h2>Location</h2>
                <p>
                  NavTatva, Brigade Road, <br />
                  Municipal No. <br />
                  10 Bengaluru 560056
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mt-4 mt-lg-0">
              <div className="footer-area">
                <h2>Follow Us</h2>
                <ul className="social-box list-inline mb-0">
                  <li className="list-inline-item">
                    <a href="#" target="_blank">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" target="_blank">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" target="_blank">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" target="_blank">
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <FooterDetail />
          </div>
        </div>
      </footer>
      {/* Fixed Button */}
      <FooterFixedButton />
      {/* End Fixed Button */}
    </>
  );
};

export default Footer;
