export const getTime = (date) => {
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(date).toLocaleTimeString([], timeOptions);
}


export const checkFileType = (fileName) => {
    const lowercasedFileName = fileName.toLowerCase().trim();

    const imageFileTypes = ['.jpg', '.jpeg', '.png', '.gif', '.tiff', '.tif', '.bmp', '.webp', '.svg', '.ico', '.raw', '.heic'];
    const videoFileTypes = ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv', '.webm', '.3gp', '.m4v'];
    const audioFileTypes = ['.mp3', '.wav', '.ogg', '.aac', '.flac', '.m4a', '.wma'];
    if (imageFileTypes.some(ext => lowercasedFileName.endsWith(ext))) {
        return 'img';
    }
    else if (videoFileTypes.some(ext => lowercasedFileName.endsWith(ext))) {
        return 'vid';
    }
    else if (audioFileTypes.some(ext => lowercasedFileName.endsWith(ext))) {
        return 'aud';
    }
    else {
        const fileExtension = lowercasedFileName.split('.').pop();
        return fileExtension;
    }
};
