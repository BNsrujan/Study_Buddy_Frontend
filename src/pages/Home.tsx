import { FileText, Upload, FileQuestion, ListChecks } from 'lucide-react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import PDFUploader from '@/components/PDFUploader';
import Summary from '@/components/Summary';
import TextInput from '@/components/TextInput';

const Home = () => {
  const navigate = useNavigate();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Text Input */}
        <Card className="p-6 flex  flex-col   ">
          <div className="flex items-center mb-4">
            <Upload className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">Upload PDF</h2>
          </div>
          <PDFUploader />

          <TextInput />

        </Card>




        <Summary />
        {/* Summary */}

        {/* Important Points */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <ListChecks className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">Important Points</h2>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <p className="text-gray-500 flex-1">
                  Important points will be displayed here...
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <p className="text-gray-500 flex-1">
                  Each point will be highlighted with a bullet...
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <p className="text-gray-500 flex-1">
                  Making it easy to review key concepts...
                </p>
              </div>
            </div>
          </div>

        </Card>

        {/* Take Test Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate('/quiz')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Take Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;