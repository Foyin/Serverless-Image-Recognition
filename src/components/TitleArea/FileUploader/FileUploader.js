import axios from 'axios';
import './FileUploader.scss';
import React, {useState} from 'react';

var API_ENDPOINT_FOR_PNG = ' https://l9b2ti151b.execute-api.us-east-1.amazonaws.com/Test/getsignedurl';
var API_ENDPOINT_FOR_JPG = 'https://jjkfm5hik6.execute-api.us-east-1.amazonaws.com/Test/getsignedurlforjpg';
var LAMBDA_ENDPOINT = 'https://tzslqv4jlnh2gk6373thnvxecm0oahdr.lambda-url.us-east-1.on.aws/';
var API_ENDPOINT;

function FileUploader({setisSubmitted, setLabels, setIsLoading}){
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
  const [preview, setPreview] = useState(undefined);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files.length ? event.target.files[0] : null);
    var MAX_IMAGE_SIZE = 10000000;
    setIsSelected(false);

    if(event.target.files[0] !== null && event.target.files[0] !== undefined ){
      if (event.target.files[0].type !== 'image/png' 
          && event.target.files[0].type !== 'image/jpeg' 
          && event.target.files[0].type !== 'image/jpg') {
        setIsSelected(false);
        return alert('Wrong file type - .png or .jpeg only.')
      }
      if (event.target.files[0].type === 'image/jpeg') {
        API_ENDPOINT = API_ENDPOINT_FOR_JPG;
      }
      if (event.target.files[0].type === 'image/jpg') {
        API_ENDPOINT = API_ENDPOINT_FOR_JPG;
      }
      if (event.target.files[0].type === 'image/png') {
        API_ENDPOINT = API_ENDPOINT_FOR_PNG;
      }
      if (event.target.files[0].size > MAX_IMAGE_SIZE) {
        setIsSelected(false);
        return alert(` Image is loo large\n Max Size: ${MAX_IMAGE_SIZE}bytes`)
      }
      else {
        setIsSelected(true);
        const objectUrl = URL.createObjectURL(event.target.files[0])
        setPreview(objectUrl)
      }
    }
	};

	const handleSubmission = async () => {
  let blobData = new Blob([selectedFile], {type: selectedFile.type})

  console.log('Upload clicked')

  try{
    setIsLoading(true);
    // Get the presigned URL
    const s3Upload = await axios(API_ENDPOINT, {
      method: 'GET',
      headers: {
        'authorizationToken': 'allow' //the token is a variable which holds the token
      }
    })
    console.log('Response: ', s3Upload);
    console.log('Uploading...');
    console.log('Uploading to: ', JSON.parse(s3Upload.data).uploadURL);

    const s3UploadTempUrl = await fetch(JSON.parse(s3Upload.data).uploadURL, {
      headers: {
        'Content-Type': selectedFile.type, //the token is a variable which holds the token
      },
      method: 'PUT',
      body: blobData
    })
    console.log('Result: ', s3UploadTempUrl)

    const lambdaInvoke = await axios(LAMBDA_ENDPOINT, {
      method: 'GET',
    })
    console.log('Labels: ', lambdaInvoke.data);
    await setIsSelected(false);
    await setLabels(lambdaInvoke.data);
    await setisSubmitted(true);
    setIsLoading(false);

    
    return [s3Upload, s3UploadTempUrl, lambdaInvoke, null];
  }catch(e) {
    return [null, "Error"];
  }
  
 /*
  // Final URL for the user doesn't need the query string params
  //this.uploadURL = response.uploadURL.split('?')[0]
*/
}
/*
		fetch(
			'https://1kaytyiugi.execute-api.us-east-1.amazonaws.com/Test',
			{
				method: 'GET',
        headers: new Headers({
          'authorizationToken': 'allow',
          //"Access-Control-Allow-Origin":"*"          //'Content-Type': 'image/png',
        }),
			}
		)
			.then(
        (response) => {
          fetch(
            response.uploadURL,
            {
              method: 'PUT',
              body: formData,
              headers: {
                'Content-Type': 'image/png',
              },

            }
          )
        }
      )
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};
	*/

	return(
   <div>
      <div className="titleDescription">
        <div className="titleDescriptionText">Serverless Image Recognition</div>
        <div className="titleDescriptionSubtext">Powered by Amazon Rekognition</div>
      </div>
			<input type="file" name="file" accept="image/png, image/jpeg, image/jpg"  onChange={changeHandler} />
			{isSelected ? (
				<div>
          <img className='previewImg' src={preview} /> 
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
          <div className="SubmitButtonContainer">
            <button className="SubmitButton" onClick={handleSubmission}>Submit</button>
          </div>
				</div>
			) : (
				<p>Select an image (.png, .jpeg)</p>
			)}
	
		</div>
	)
}
export default FileUploader;