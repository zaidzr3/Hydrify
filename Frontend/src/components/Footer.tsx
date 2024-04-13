const Footer = () => {
    return (
      <footer className="bg-gray-900 text-teal-400">
        <div className="container mx-auto px-5 lg:px-10 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h5 className="text-lg font-bold mb-3">Quick Links</h5>
            <ul className="space-y-2">
              <li>Home</li>
              <li>Shop</li>
              <li>About</li>
              <li>Review</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-3">Extra Links</h5>
            <ul className="space-y-2">
              <li>My Order</li>
              <li>My Wishlist</li>
              <li>My Account</li>
              <li>Terms Of Use</li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-3">Follow Us</h5>
            
          </div>
          <div>
            <h5 className="text-lg font-bold mb-3">Newsletter</h5>
            <form className="flex flex-col space-y-3">
              <input type="email" placeholder="Enter your email" className="px-4 py-2 border border-teal-400 rounded bg-gray-800 text-white"/>
              <button className="px-4 py-2 bg-teal-500 rounded text-white font-bold">Subscribe</button>
            </form>
            
          </div>
        </div>
        <div className="border-t border-gray-700 text-center py-4">
          <span>All Rights Reserved!</span>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  