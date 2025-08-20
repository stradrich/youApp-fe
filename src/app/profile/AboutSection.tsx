import React, { useRef } from "react";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddIcon from '@mui/icons-material/Add';

export default function AboutSection({
    aboutRef,
    about,
    // age,
    isEdit,
    onEditToggle,
    onSave,
    fields,
    selectedPhoto,
    fileInputRef,
    handlePhotoClick,
    handleFileChange,
    }) {

    // async function handleSaveUpdate() {
    //     if (!aboutRef.current) return;

    //     const form = aboutRef.current.querySelector("form");
    //     const formData = new FormData(form);
    //     const values = Object.fromEntries(formData.entries());

    //     const updatedProfile = {
    //         username: values.displayName || profile.username,
    //         age: values.age || "", // backend can calculate
    //         gender: values.gender || profile.gender,
    //         interests: profile.interests,
    //         backgroundImage: selectedPhoto || profile.backgroundImage,
    //         birthday: values.birthday ? new Date(values.birthday).toISOString() : profile.about?.birthday,
    //         horoscope: profile.about?.horoscope || "", // backend can calculate
    //         zodiac: profile.about?.zodiac || "", // backend can calculate
    //         height: values.height || profile.about?.height,
    //         weight: values.weight || profile.about?.weight,
    //     };

    //     try {
    //         const res = await fetch(`http://localhost:3005/profile/${profile._id}`, {
    //             method: "PATCH",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(updatedProfile),
    //         });

    //         if (!res.ok) throw new Error("Failed to update profile");

    //         const data = await res.json();
    //         console.log("Profile updated:", data);

    //         // update local state
    //         setProfile(data);
    //         setSelectedPhoto(null);
    //         setIsEdit(false);
    //     } catch (err) {
    //         console.error(err);
    //         alert("Profile update failed");
    //     }
    // }

    return (
        <>
        {!isEdit ? (
            about ? (
            <div className="bg-white/20 p-4 rounded-md mb-6">
                <div className="flex justify-between items-center mb-2">
                <p className="text-lg">About</p>
                <button type="button" className="text-gray-400" onClick={onEditToggle}>
                    <BorderColorIcon />
                </button>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                <p className="flex">Birthday: {about.birthday ? new Date(about.birthday).toISOString().split('T')[0] : ""}
                             <div className="mx-2">
                                (Age {about.age})
                            </div>
                             {/* (Age {age}) */}
                </p>
                <p>Horoscope: {about?.horoscope?.replace(/^[^\w]*|\s*\(.*\)$/g, '').trim()}</p>
                <p>Zodiac: {about?.zodiac}</p>
                <p>Height: {about?.height}</p>
                <p>Weight: {about?.weight}</p>
                </div>
            </div>
            ) : (
            <div className="bg-white/20 p-4 rounded-md mb-6">
                <div className="flex justify-between items-center mb-2">
                <p className="text-lg">About</p>
                <button type="button" className="text-gray-400" onClick={onEditToggle}>
                    <BorderColorIcon />
                </button>
                </div>
                <p className="text-sm mt-4">Add in your details to help others know you better</p>
            </div>
            )
        ) : (
            <div ref={aboutRef} className="bg-white/20 p-4 rounded-md mb-6">
            <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold">About</p>
                <button
                type="button"
                className="text-yellow-200 underline text-xs"
                onClick={onSave}
                >
                Save & Update
                </button>
            </div>

            {selectedPhoto ? (
                <img
                src={selectedPhoto}
                alt="Selected"
                className="h-12 w-12 object-cover rounded-md mb-6"
                />
            ) : (
                <div className="bg-white/20 p-2 h-12 w-12 rounded-md flex items-center justify-center mb-4">
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
                <button onClick={handlePhotoClick}>
                    <AddIcon sx={{ color: '#ffff00' }} />
                </button>
                </div>
            )}

            <form className="flex flex-col gap-3">
                {fields.map((field, idx) => (
                <div key={idx} className="flex items-center gap-4">
                    <label className="w-28 text-sm" htmlFor={field.name}>{field.label}:</label>
                    {field.type === 'select' ? (
                    <select
                        name={field.name}
                        id={field.name}
                        className="flex-1 bg-white/20 p-2 rounded-md text-white"
                        defaultValue={about?.[field?.name] || ''}
                    >
                        <option value="" disabled>
                        Select {field.label}
                        </option>
                        {field.options?.map((opt, i) => (
                        <option key={i} value={opt}>
                            {opt}
                        </option>
                        ))}
                    </select>
                    ) : (
                    <input
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        placeholder={field.placeholder}
                        className="flex-1 bg-white/20 p-2 rounded-md"
                        defaultValue={about?.[field?.name] || ""}
                    />
                    )}
                </div>
                ))}
            </form>
            </div>
        )}
        </>
    );
}


            //    {!isEdit ? (
            //         profile.about ? (
            //         <div className="bg-white/20 p-4 rounded-md mb-6">
            //             <div className="flex justify-between items-center mb-2">
            //             <p className="text-lg">About</p>
            //             <button type="button" className="text-gray-400" onClick={() => setIsEdit(true)}>
            //                 <BorderColorIcon />
            //             </button>
            //             </div>
            //             <div className="flex flex-col gap-2 text-sm">
            //             <p>Birthday: 
            //                 {profile.about.birthday} 
            //                 (Age {age})
            //             </p>
            //             <p>Horoscope: {profile.about.horoscope.replace(/^[^\w]*|\s*\(.*\)$/g, '').trim()}</p>
            //             <p>Zodiac: {profile.about.zodiac}</p>
            //             <p>Height: {profile.about.height}</p>
            //             <p>Weight: {profile.about.weight}</p>
            //             </div>
            //         </div>
            //         ) : (
            //         <div className="bg-white/20 p-4 rounded-md mb-6">
            //             <div className="flex justify-between items-center mb-2">
            //             <p className="text-lg">About</p>
            //             <button type="button" className="text-gray-400" onClick={() => setIsEdit(true)}>
            //                 <BorderColorIcon />
            //             </button>
            //             </div>
            //             <p className="text-sm mt-4">Add in your details to help others know you better</p>
            //         </div>
            //         )
            //     ) : (
            //         <div ref={aboutRef} className="bg-white/20 p-4 rounded-md mb-6">
            //         <div className="flex justify-between items-center mb-4">
            //             <p className="text-lg font-semibold">About</p>
            //             <button
            //             type="button"
            //             className="text-yellow-200 underline text-xs"
            //             onClick={handleSaveUpdate}
            //             >
            //             Save & Update
            //             </button>
            //         </div>

            //             {selectedPhoto ? (
            //                 <img
            //                     src={selectedPhoto}
            //                     alt="Selected"
            //                     className="h-12 w-12 object-cover rounded-md mb-6"
            //                 />
            //                 ) : (
            //                 <div className="bg-white/20 p-2 h-12 w-12 rounded-md flex items-center justify-center mb-4">
            //                     <input
            //                     type="file"
            //                     accept="image/*"
            //                     ref={fileInputRef}
            //                     className="hidden"
            //                     onChange={handleFileChange}
            //                     />
            //                     <button onClick={handlePhotoClick}>
            //                         <AddIcon sx={{ color: '#ffff00' }} />
            //                     </button>
            //                 </div>
            //             )}

            //         <form className="flex flex-col gap-3">
            //             {fields.map((field, idx) => (
            //             <div key={idx} className="flex items-center gap-4">
            //                 <label className="w-28 text-sm"  htmlFor={field.name}>{field.label}:</label>
            //                 {field.type === 'select' ? (
            //                 <select
            //                     name={field.name}
            //                     id={field.name}
            //                     className="flex-1 bg-white/20 p-2 rounded-md text-white"
            //                     defaultValue={profile.gender} 
            //                     >
            //                     <option value="" disabled>
            //                         Select {field.label}
            //                     </option>
            //                     {field.options?.map((opt, i) => (
            //                         <option key={i} value={opt}>
            //                             {opt}
            //                         </option>
            //                     ))}
            //                 </select>
            //                 ) : (
            //                 <input
            //                     type={field.type}
            //                     name={field.name}
            //                     id={field.name}
            //                     placeholder={field.placeholder}
            //                     className="flex-1 bg-white/20 p-2 rounded-md"
            //                     defaultValue={profile[field.name] || ""}
            //                 />
            //                 )}
            //             </div>
            //             ))}
            //         </form>
            //         </div>
            //     )}