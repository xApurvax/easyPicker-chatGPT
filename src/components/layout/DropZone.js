import React, { useCallback } from "react";
import ImageUploading from "react-images-uploading";
import { MdCancel, MdOutlineCancel } from "react-icons/md";
import dummy_user from "../../assets/dummy_user.png";

const DropZone = ({ image, setImage, imageAfterCrop, imageAtEdit }) => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    setImage(imageList);
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        allowNonImageType={false}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper h-full w-full relative  flex items-center justify-center">
            <button
              type="button"
              className="absolute h-max w-max"
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            ></button>
            {imageAfterCrop || imageAtEdit ? (
              <>
                <div className="h-12 w-12 ms:h-12 ms:w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-16 lg:w-16 flex justify-center items-center relative">
                  <img
                    src={imageAfterCrop || imageAtEdit}
                    alt="Picture of an text"
                    // width={647}
                    // height={213}
                    className="overflow-hidden w-full h-full rounded-full border-[1px] border-solid border-gray-500"
                  />
                  <div className="image-item__btn-wrapper absolute -bottom-1 -right-2 sm:-right-1 md:right-0 rotate-45 flex justify-center items-center">
                    <button type="button" style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}>
                      <MdOutlineCancel fill="#544BB9" className="text-2xl" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="">
                  <div className="w-full h-full ms:h-12 ms:w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-16 lg:w-16 flex justify-center items-center relative">
                  <img
                    src={dummy_user}
                    alt="Picture of an text"
                    className="overflow-hidden w-full h-full rounded-full border-[1px] border-solid border-gray-500"
                  />
                  <div className="image-item__btn-wrapper absolute bottom-0 -right-2 sm:-right-1 md:right-03 rotate-45 flex justify-center items-center">
                    <button type="button"
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}>
                      <MdOutlineCancel fill="#544BB9" className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            //   <div className="">
            //        <div className="w-full h-full ms:h-12 ms:w-12 flex justify-center items-center">
            //     <img
            //         src={dummy_user}
            //         alt="Picture of an text"
            //         className="rounded-full"
            //       />
            //   <div className="image-item__btn-wrapper absolute bottom-0 right-0 rotate-45 flex justify-center items-center">
            //         <button type="button" onClick={() => onImageRemove()}>
            //           <MdOutlineCancel size={20} fill="#544BB9" />
            //         </button>
            //       </div>
            //   </div>
            // </div>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};
export default DropZone;