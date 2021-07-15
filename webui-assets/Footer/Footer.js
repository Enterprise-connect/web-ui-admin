import React from "react";

const Footer = () => {
  return (
    <div className="copyright">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <span>© 2021 General Electric</span>
          </div>

          <div className="col-md-6 ">
            <div className="copyright-menu">
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com/ge"
                    aria-label="General Electric Facebook page"
                    title="General Electric Facebook page"
                    target='_blank'
                  >
                    <span className="fa fa-facebook fa-in"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/ge"
                    aria-label="General Electric YouTube page"
                    title="General Electric YouTube page"
                    target='_blank'
                  >
                    <span className="fa fa-youtube fa-in"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/generalelectric"
                    aria-label="General Electric Instagram page"
                    title="General Electric Instagram page"
                    target='_blank'
                  >
                    <span className="fa fa-instagram fa-in"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.twitter.com/generalelectric"
                    aria-label="General Electric Twitter page"
                    title="General Electric Twitter page"
                    target='_blank'
                  >
                    <span className="fa fa-twitter fa-in"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/ge"
                    aria-label="General Electric LinkedIn page"
                    title="General Electric LinkedIn page"
                    target='_blank'
                  >
                    <span className="fa fa-linkedin fa-in"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
