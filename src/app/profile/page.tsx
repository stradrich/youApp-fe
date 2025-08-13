'use client'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import { useEffect, useRef, useState } from 'react';

export default function Profile() {
  // Mock user profile data
    const mockProfile = {
    username: 'john_doe',
    age: 28,
    gender: 'Male',
    chips: ['Coffee', 'Hiking'],
    backgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPxZJB1F_RDQVc3ciNk5PUGwFGHCNSAmEz4w&s',
    about: {
        birthday: '1995-08-28',
        horoscope: 'Virgo',
        zodiac: 'Pig',
        height: '175 cm',
        weight: '69 kg',
    },
    interests: ['Photography', 'Traveling', 'Cooking'],
    };

    const fields = [
    { name: 'displayName', label: 'Display name', placeholder: 'Enter name', type: 'text' },
    { name: 'gender', label: 'Gender', placeholder: 'Select Gender', type: 'select', options: ['Male', 'Female', 'Others'] },
    { name: 'birthday', label: 'Birthday', placeholder: 'DD MM YYYY', type: 'date' },
    { name: 'horoscope', label: 'Horoscope', placeholder: '--', type: 'text' },
    { name: 'zodiac', label: 'Zodiac', placeholder: '--', type: 'text' },
    { name: 'height', label: 'Height', placeholder: 'Add height', type: 'number' },
    { name: 'weight', label: 'Weight', placeholder: 'Add weight', type: 'number' },
    ];

  const [isEdit, setIsEdit] = useState(false);
  const [profile, setProfile] = useState(mockProfile); // using mock data
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const fileInputRef = useRef(null);
  const [isEditInterest, setIsEditInterest] = useState(false);
  const [tempChips, setTempChips] = useState([]);
  const [interestInput, setInterestInput] = useState("");
  const aboutRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
        if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setIsEdit(false);
        }
    }

    if (isEdit) {
        document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
    }, [isEdit]);

    const handlePhotoClick = () => {
    console.log('select new photo');
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      setSelectedPhoto(photoURL);
    }
  };

  function handleSaveUpdate() {
    console.log('save & update clicked');
   
    if (!aboutRef.current) return;

    const form = aboutRef.current.querySelector("form");
    const formData = new FormData(form);
    let values = Object.fromEntries(formData.entries());

    setProfile(prev => ({
        ...prev,
        username: values.displayName || prev.username,
        gender: values.gender || prev.gender,
        backgroundImage: selectedPhoto || prev.backgroundImage,
        about: {
        ...prev.about,
        birthday: values.birthday || prev.about.birthday,
        horoscope: values.horoscope || prev.about.horoscope,
        zodiac: values.zodiac || prev.about.zodiac,
        height: values.height || prev.about.height,
        weight: values.weight || prev.about.weight,
        },
    }));

    console.log(values);
    setIsEdit(false);
    }

    const handleEditInterest = () => {
    setTempChips([...profile.interests]);
    setIsEditInterest(true);
    };

    const handleInterestKeyDown = (e) => {
    if (e.key === "Enter" && interestInput.trim() !== "") {
        e.preventDefault();
        setTempChips([...tempChips, interestInput.trim()]);
        setInterestInput("");
    }
    };

    const handleDeleteChip = (chipToDelete) => {
        setTempChips(tempChips.filter((chip) => chip !== chipToDelete));
    };

    const handleSaveInterests = () => {
        console.log("Current interest input:", tempChips);
        setProfile((prev) => ({
            ...prev,
            interests: tempChips
        }));
        setIsEditInterest(false);
    };

  return (
    <div className="max-w-[375px] mx-auto min-h-screen bg-black text-white p-6">
        {!isEditInterest ? (
                <>
                <div className="flex mb-5 justify-between">
                    <a href="/">
                        <ArrowBackIosIcon />
                    </a>
                        <span>@{profile.username}</span>
                    <MoreHorizIcon />
                </div>
                </>
            ) : (
                <>
                  <div className="flex mb-5 justify-between">
                    <a href="/profile">
                        <ArrowBackIosIcon />
                    </a>
                    <button
                        type="button"
                        className="text-blue-400 text-sm"
                        onClick={handleSaveInterests}
                    >
                        Save
                    </button>
                  </div>
                </>
        )}

        {!isEditInterest && (
            <>
                {profile.backgroundImage ? (
                <div
                    className="bg-cover bg-center h-48 rounded-md relative mb-6"
                    style={{
                    backgroundImage: `url(${profile.backgroundImage})`,
                    }}
                >
                    <p className="absolute bottom-16 left-4 text-sm">
                    @{profile.username}, {profile.age}
                    </p>
                    <p className="absolute bottom-10 left-4 text-sm">{profile.gender}</p>

                    <div className="absolute bottom-1 left-3 flex gap-2">
                    {profile.chips.map((chip, i) => (
                        <Chip
                        key={i}
                        label={chip}
                        sx={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            fontSize: '0.75rem',
                        }}
                        />
                    ))}
                    </div>
                </div>
                ) : (
                <div className="bg-white/20 p-4 rounded-md mb-6">
                    <p className="text-sm mt-[10rem]">@ {profile.username}</p>
                </div>
                )}

                {/* ABOUT */}
                {!isEdit ? (
                    profile.about ? (
                    // Populated view
                    <div className="bg-white/20 p-4 rounded-md mb-6">
                        <div className="flex justify-between items-center mb-2">
                        <p className="text-lg">About</p>
                        <button type="button" className="text-gray-400" onClick={() => setIsEdit(true)}>
                            <BorderColorIcon />
                        </button>
                        </div>
                        <div className="flex flex-col gap-2 text-sm">
                        <p>Birthday: {profile.about.birthday} (Age {profile.age})</p>
                        <p>Horoscope: {profile.about.horoscope}</p>
                        <p>Zodiac: {profile.about.zodiac}</p>
                        <p>Height: {profile.about.height}</p>
                        <p>Weight: {profile.about.weight}</p>
                        </div>
                    </div>
                    ) : (
                    // Empty view
                    <div className="bg-white/20 p-4 rounded-md mb-6">
                        <div className="flex justify-between items-center mb-2">
                        <p className="text-lg">About</p>
                        <button type="button" className="text-gray-400" onClick={() => setIsEdit(true)}>
                            <BorderColorIcon />
                        </button>
                        </div>
                        <p className="text-sm mt-4">Add in your details to help others know you better</p>
                    </div>
                    )
                ) : (
                    // Edit mode
                    <div ref={aboutRef} className="bg-white/20 p-4 rounded-md mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-lg font-semibold">About</p>
                        <button
                        type="button"
                        className="text-yellow-200 underline text-xs"
                        onClick={handleSaveUpdate}
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
                            <label className="w-28 text-sm"  htmlFor={field.name}>{field.label}:</label>
                            {field.type === 'select' ? (
                            <select
                                name={field.name}
                                id={field.name}
                                className="flex-1 bg-white/20 p-2 rounded-md text-white"
                                defaultValue={profile.gender} 
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
                                defaultValue={profile[field.name] || ""}
                            />
                            )}
                        </div>
                        ))}
                    </form>
                    </div>
                )}
            </>
        )} 

        {/* INTEREST */}
        {!isEditInterest ? (
        <div className="bg-white/20 p-4 rounded-md mb-6">
            <div className="flex justify-between items-center mb-2">
            <p className="text-lg">Interest</p>
            <button
                type="button"
                className="text-gray-400"
                onClick={handleEditInterest}
            >
                <BorderColorIcon />
            </button>
            </div>
              {profile.interests && profile.interests.length > 0 ? (
                // Populated view
                <div className="flex flex-wrap gap-2 mt-4">
                {profile.interests.map((interest, index) => (
                    <Chip
                    key={index}
                    label={interest}
                    sx={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        fontSize: '0.75rem',
                    }}
                    />
                ))}
                </div>
            ) : (
                // Empty view
                <p className="text-sm mt-4">
                Add in your interests to find a better match
                </p>
            )}
        </div>
        ) : (
        <>
            {/* Edit Interest Mode */}
            <p className="text-yellow-200 text-xs">
            Tell everyone about yourself
            </p>
            <p className="text-lg">What interests you?</p>
            <div className="bg-white/20 p-3 rounded-md mt-6 flex flex-wrap gap-1 items-center">
                {tempChips.map((chip, i) => (
                    <Chip
                    key={i}
                    label={chip}
                    onDelete={() => handleDeleteChip(chip)}
                    sx={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "white",
                        fontSize: "0.75rem",
                        "& .MuiChip-deleteIcon": {
                        color: "rgba(255, 255, 255, 0.89)",
                        },
                    }}
                    />
                ))}

                <input
                    type="text"
                    value={interestInput}
                    onChange={(e) => setInterestInput(e.target.value)}
                    onKeyDown={handleInterestKeyDown}
                    placeholder=""
                    className="bg-transparent outline-none text-white flex-1 min-w-[120px]"
                />
            </div>
        </>
        )}
    </div>
  );
}
