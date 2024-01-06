import React, { useState, useEffect } from 'react';
import { checkFileType } from '../../utils/utility_functions';
import audioPng from '../../assets/fileIcons/audio.png';
import videoPng from '../../assets/fileIcons/video.png';

const FileIcon = ({ imageUrl, fileName }) => {
    const [src, setSrc] = useState(null);

    useEffect(() => {
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
                .catch((error) => console.error('Error loading image:', error));
        }
    }, [fileName, imageUrl]);

    return <img src={ src } alt={ checkFileType(fileName) } width='100%' />;
};

export default FileIcon;
