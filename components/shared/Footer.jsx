const Footer = () => {
  return (
    <footer className="border-t bg-gray-50 dark:bg-black py-12 text-center text-sm text-muted-foreground dark:text-gray-400">
      © {new Date().getFullYear()} Splitr. All rights reserved.
    </footer>
  );
};

export default Footer;
