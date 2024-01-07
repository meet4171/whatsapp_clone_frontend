import React, { useEffect, useState } from 'react';
import { checkFileType } from '../../utils/utility_functions';
import audioPng from '../../assets/fileIcons/audio.png';
import videoPng from '../../assets/fileIcons/video.png';

const FileIcon = ({ imageUrl, fileName }) => {
    const [src, setSrc] = useState(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    const handleImageError = () => {
        console.error('Error loading image:', imageUrl);
    };

    const loadImage = () => {
        const fileExt = checkFileType(fileName);

        if (fileExt === 'img') {
            setSrc(imageUrl);
        } else if (fileExt === 'vid') {
            setSrc(videoPng);
        } else if (fileExt === 'aud') {
            setSrc(audioPng);
        } else {
            import(`../../assets/fileIcons/${fileExt}.png`)
                .then((module) => setSrc(module.default))
                .catch(handleImageError);
        }
    };

    // Load the image when the component mounts
    useEffect(() => {
        loadImage();
    }, [fileName, imageUrl]);

    return (
        <img
            src={src}
            alt={checkFileType(fileName)}
            width='100%'
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: isImageLoaded ? 'block' : 'none' }}
        />
    );
};

export default FileIcon;
