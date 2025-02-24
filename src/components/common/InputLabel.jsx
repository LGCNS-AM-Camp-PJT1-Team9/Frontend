import React from "react";
import "./InputLabel.css"; 

export const InputLabel = ({ 
    label, 
    name, 
    type = "text", 
    placeholder, 
    value, 
    onChange, 
    onFileChange, 
    className, 
    backgroundColor = "#f2f1fa",
    accept = "image/*", // 파일 업로드에 필요한 옵션
}) => {
    return (
        <div className="input_label_wrapper">
            <label className="input_label" htmlFor={name}>
                {label}
            </label>
            {type === "file" ? (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                    <input
                        className={className || "input_with_label"}
                        type="text"
                        placeholder={placeholder || "파일 이름"}
                        value={value}
                        readOnly
                        style={{ backgroundColor }}
                    />
                    <label className="file_upload_button" htmlFor={name}>
                        파일 선택
                    </label>
                    <input
                        id={name}
                        name={name}
                        type="file"
                        accept={accept}
                        onChange={onFileChange}
                        style={{ display: "none" }}
                    />
                </div>
            ) : (
                <input
                    style={{ backgroundColor }}
                    className={className || "input_with_label"}
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            )}
        </div>
    );
};
