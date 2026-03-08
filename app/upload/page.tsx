import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ImageUploader from '@/components/upload/ImageUploader';

export const metadata = {
  title: 'Diagnose a Crop · Bloom',
};

export default function UploadPage() {
  return (
    <>
      <Navbar />
      <ImageUploader />
      <Footer />
    </>
  );
}
