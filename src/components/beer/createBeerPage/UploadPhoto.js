import React from 'react';

class UploadPhoto extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        let imagePreviewUrl = this.props.imagePreviewUrl;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img alt="placeholder" src={imagePreviewUrl} class="rounded zdjeciePiwa" />);
        } else {
            $imagePreview = (<img alt="group" src="/images/piwo.jpg" class="rounded zdjeciePiwa" />);
        }

        return(
            <div> 
                {$imagePreview}
                <div>
                    <form className="choose-group-photo ">
                        <label for="file" >
                        <input
                            type="file"
                            onChange={(e)=>this.props.handleImageChange(e)} 
                            class="btn btn-outline-warning"/>
                        </label>
                    </form>
                </div>
            </div>
       
        );
    }
}

export default UploadPhoto;

