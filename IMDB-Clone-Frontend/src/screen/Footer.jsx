import React from 'react';
import { FaTiktok, FaInstagram, FaXTwitter, FaFacebook } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-5 pb-4">
      <div className="container text-center">
        <div className="mb-4 d-flex justify-content-center gap-4 fs-4">
          <FaTiktok />
          <FaInstagram />
          <FaXTwitter />
          <FaFacebook />
        </div>

        <div className="row justify-content-center text-secondary small mb-4">
          {[
            "Help", "Site Index", "IMDbPro", "Box Office Mojo", "License IMDb Data",
            "Press Room", "Advertising", "Jobs", "Conditions of Use", "Privacy Policy"
          ].map((text, i) => (
            <div key={i} className="col-auto mb-2">
              <a href="#" className="text-secondary text-decoration-none">{text}</a>
            </div>
          ))}
        </div>

        <div className="form-check d-flex justify-content-center align-items-center gap-2 mb-2">
          <input className="form-check-input bg-warning border-0" type="checkbox" defaultChecked />
          <label className="form-check-label text-secondary small">Your Ads Privacy Choices</label>
        </div>

        <div className="text-secondary small">
          <p className="mb-1">
            an <span className="fw-bold text-white">amazon</span> company
          </p>
          <p>© 1990–2025 by IMDb.com, Inc.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
