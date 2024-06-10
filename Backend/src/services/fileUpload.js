const path = require('path');

const singleFileUpload = async (fileObject, product_id) => {

    let uploadPath = path.resolve(__dirname, '../../../Frontend/src/assets/img/products');
    let finalName = `${product_id}`;
    let finalPath = `${uploadPath}/${finalName}`;

    try {
        await fileObject.mv(finalPath);
        return {
            EC: 0,
            DT: "",
            EM: "Upload image successfully ",
        }

    } catch (err) {
        return {
            EC: -1,
            DT: "",
            EM: "Upload image failed ",
        }
    }
}

const multipleFileUpload = async (fileObjects) => {

    uploadPaths = [];
    try {
        await fileObjects.forEach(async (item) => {

            let extName = path.extname(item.name);
            let baseName = path.basename(item.name, extName);

            let uploadPath = path.resolve(__dirname, '../public/image');
            let finalName = `${baseName}-${Date.now()}${extName}`;
            let finalPath = `${uploadPath}/${finalName}`;
            await item.mv(finalPath);
        })

        return {
            EC: 0,
            DT: "",
            EM: "Upload image successfully ",
        }

    } catch (err) {
        return {
            EC: -1,
            DT: "",
            EM: "Upload image failed ",
        }
    }
}

module.exports = { singleFileUpload, multipleFileUpload }