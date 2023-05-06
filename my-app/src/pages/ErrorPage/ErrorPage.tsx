import './ErrorPage.css'
import { Link } from 'react-router-dom';
import {Button} from 'native-base'


export function ErrorPage() {
    return (
        <div className='error'>
            <div className='container'>
                <h1>404</h1>
                <h1>Page Not Found</h1>
                <h4>Please Check Your URL</h4>
            </div>
            <div className="error-btn">
            <Link to="/">
          <Button my="2" alignSelf="center">
            Go back Home
          </Button>
        </Link>
                </div>
        </div>
    );
};

export default ErrorPage;