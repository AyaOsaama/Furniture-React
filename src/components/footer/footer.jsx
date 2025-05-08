function Footer() {
  return (
    <footer className="footer flex flex-col md:flex-row justify-between bg-neutral text-neutral-content p-10 gap-8">
      <nav>
        <h6 className="footer-title">About us</h6>
        <p className="max-w-xs">
          We are committed to offering premium furniture that combines beauty,
          comfort, and durability — made to last and inspire.
        </p>
      </nav>
      <nav>
        <h6 className="footer-title">FurniITI</h6>
        <a className="link link-hover">Home</a>
        <a className="link link-hover">Shop</a>
        <a className="link link-hover">About Us</a>
        <a className="link link-hover">Blog</a>
      </nav>
      <nav>
        <h6 className="footer-title">Download</h6>
        <a className="link link-hover">Instagram</a>
        <a className="link link-hover">Facebook</a>
        <a className="link link-hover">Twitter</a>
      </nav>
      <nav>
        <h6 className="footer-title">Call Center</h6>
        <p>We're here to help you find your perfect home style.</p>
        <a className="link link-hover">mostafagaber1234560@gmail.com</a>
        <a className="link link-hover">(+20) 1028237890</a>
      </nav>
    </footer>
  );
}

export default Footer;
