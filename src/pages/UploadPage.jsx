import Header from '../components/navigation/Header';
import Upload from '../components/upload/Upload';
import { motion } from 'framer-motion';
import PasswordProtect from '../components/upload/PasswordProtect'; 

const UploadPage = () => {
  return (
    <PasswordProtect> 
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2.4 }}
        className="w-full"
      >
        <Header showLogo={true} animateLogo={false} />
        <Upload />
      </motion.div>
    </PasswordProtect>
  );
};

export default UploadPage;
