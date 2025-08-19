'use client'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import { useEffect, useRef, useState } from 'react';
import { normalizeZodiacData } from '../../utils/cleanHoroscopeData';
import { horoscopeData } from '../../utils/horroscopeData';
import { zodiacData } from '../../utils/zodiacData'; 
import { getWesternHorroscope, getChineseZodiac } from '../../utils/computeAstrology';
import { mockProfile } from '../../profile/mockData';
import { fields } from '../../profile/formFields';
import AboutSection from '../AboutSection';
import HeaderSection from '../HeaderSection';
import InterestsSection from '../InterestSection';
import ProtectedProfile from '@/components/ProtectedProfile';
import { useParams } from "next/navigation";

export default function Profile() {
  const cleanedWesternHorroscope = normalizeZodiacData('western', horoscopeData);
  const cleanedChineseZodiac = normalizeZodiacData('chinese', zodiacData);
  const [isEdit, setIsEdit] = useState(false);
  const [profile, setProfile] = useState(mockProfile); // mock data (change this when BE is built)
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const fileInputRef = useRef(null);
  const [isEditInterest, setIsEditInterest] = useState(false);
  const [tempChips, setTempChips] = useState([]);
  const [interestInput, setInterestInput] = useState("");
  const aboutRef = useRef(null);
  const params = useParams();
  const { userId } = params;

  useEffect(() => {
    async function  fetchProfile() {
        try {
            const respond = await fetch(`http://localhost:3005/profile/${userId}`);
            const data = await respond.json();
            setProfile(data);
        } catch (error) {
            console.error(error);
        }
    }
    fetchProfile(); 
  }, [userId])

  console.log(profile);
  

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

    async function handleSaveUpdate() {
        console.log('save & update clicked');

        if (!aboutRef.current) return;

        const form = aboutRef.current.querySelector("form");
        const formData = new FormData(form);
        const values = Object.fromEntries(formData.entries());

        // move logic to BE
        // const birthdayStr = values.birthday || profile.about.birthday;
        // const birthday = birthdayStr ? new Date(birthdayStr) : null;

        // let horoscope = profile.about.horoscope;
        // let zodiac = profile.about.zodiac;

        // if (birthday) {
        //     horoscope = getWesternHorroscope(birthday, cleanedWesternHorroscope) || horoscope;
        //     zodiac = getChineseZodiac(birthday, cleanedChineseZodiac) || zodiac;
        // }

        // console.log(horoscope);
        

        // setProfile(prev => ({
        //     ...prev,
        //     username: values.displayName || prev.username,
        //     gender: values.gender || prev.gender,
        //     backgroundImage: selectedPhoto || prev.backgroundImage,
        //     about: {
        //     ...prev.about,
        //     birthday: birthdayStr || prev.about.birthday,
        //     horoscope,
        //     zodiac,
        //     height: values.height || prev.about.height,
        //     weight: values.weight || prev.about.weight,
        //     },
        // }));

        //    setProfile(prev => ({
        //     ...prev,
        //     username: values.displayName || prev.username,
        //     gender: values.gender || prev.gender,
        //     backgroundImage: selectedPhoto || prev.backgroundImage,
        //     about: {
        //         ...prev.about,
        //         birthday: values.birthday || prev.about.birthday, // send raw birthday
        //         height: values.height || prev.about.height,
        //         weight: values.weight || prev.about.weight,
        //     },
        // }));
        
        const updatedProfile = {
            username: values.displayName || profile.username,
            age: values.age || "", // backend calculates if needed
            gender: values.gender || profile.gender,
            // interests: values.profile || profile.interests,
            // interests: isEditInterest ? tempChips : profile.interests,
            backgroundImage: selectedPhoto || profile.backgroundImage,
            birthday: values.birthday ? new Date(values.birthday).toISOString() : profile.about?.birthday,
            horoscope: profile.about?.horoscope || "", // backend calculates if needed
            zodiac: profile.about?.zodiac || "",       // backend calculates if needed
            height: values.height || profile.about?.height,
            weight: values.weight || profile.about?.weight,
        };

        // API CALL HERE
        console.log(values);
         try {
            const respond = await fetch(`http://localhost:3005/profile/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProfile),
            });

            if (!respond.ok) throw new Error("Failed to update profile");

            const data = await respond.json();
            setProfile(data);
            setSelectedPhoto(null);
            setIsEdit(false);
        } catch (error) {
            console.error(error);
            alert("Profile update failed");
        }
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

    // const handleSaveInterests = () => {
    //     console.log("Current interest input:", tempChips);
    //     setProfile((prev) => ({
    //         ...prev,
    //         interests: tempChips
    //     }));
    //     setIsEditInterest(false);
    // };

    async function handleSaveInterests() {
    if (!tempChips || tempChips.length === 0) return;

    try {
        const respond = await fetch(`http://localhost:3005/profile/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ interests: tempChips }),
        });

        if (!respond.ok) throw new Error("Failed to update interests");

        const data = await respond.json();
        setProfile((prev) => ({ ...prev, interests: data.interests }));
        setIsEditInterest(false);
    } catch (error) {
        console.error(error);
        alert("Interests update failed");
    }
}


    // move logic to BE
    // function calculateAge(birthdayStr) {
    //     const birthday = new Date(birthdayStr);
    //     const today = new Date();
    //     let age = today.getFullYear() - birthday.getFullYear();
    //     const m = today.getMonth() - birthday.getMonth();

    //     if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    //         age--;
    //     }

    //     return age;
    // }

    // const age = calculateAge(profile.about?.birthday);
    

  return (
    <ProtectedProfile>
        <div className="max-w-[375px] mx-auto min-h-screen bg-black text-white p-6">
            {/* HEADER SECTION */}
            <HeaderSection
                username={profile.username}
                isEditInterest={isEditInterest}
                onSaveInterests={handleSaveInterests}
            />

            {!isEditInterest && (
                <>
                    {/* HERO SECTION */}
                    {profile.backgroundImage ? (
                    <div
                        className="bg-cover bg-center h-48 rounded-md relative mb-6"
                        style={{
                        backgroundImage: `url(${profile.backgroundImage})`,
                        }}
                    >
                        <p className="flex absolute bottom-16 left-4 text-sm">
                        @{profile.username}, 
                        <div className='mx-2'>
                         {profile.age},
                        </div>
                        {/* {age} */}
                        </p>
                        <p className="absolute bottom-10 left-4 text-sm">{profile.gender}</p>

                        <div className="absolute bottom-1 left-3 flex gap-2">
                        {/* {profile.chips.map((chip, i) => (
                            <Chip
                            key={i}
                            label={chip}
                            sx={{
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                fontSize: '0.75rem',
                            }}
                            />
                        ))} */}
                        <Chip
                            label={profile.about?.horoscope?.replace(/\s*\(.*\)$/, '')}
                            sx={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            fontSize: '0.75rem',
                            }}
                        />
                        <Chip
                            label={profile.about?.zodiac}
                            sx={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            fontSize: '0.75rem',
                            }}
                        />
                        </div>
                    </div>
                    ) : (
                    <div className="bg-white/20 p-4 rounded-md mb-6">
                        <p className="text-sm mt-[10rem]">@ {profile.username}</p>
                    </div>
                    )}

                    {/* ABOUT */}
                    <AboutSection
                        aboutRef={aboutRef}
                        // about={profile.about}
                        about={profile}
                        // age={age}
                        isEdit={isEdit}
                        onEditToggle={() => setIsEdit(true)}
                        onSave={handleSaveUpdate}
                        fields={fields}
                        selectedPhoto={selectedPhoto}
                        fileInputRef={fileInputRef}
                        handlePhotoClick={handlePhotoClick}
                        handleFileChange={handleFileChange}
                    />
                </>
            )} 

            {/* INTEREST SECTION */}
            <InterestsSection
                interests={profile.interests}
                isEditInterest={isEditInterest}
                onEditInterest={handleEditInterest}
                tempChips={tempChips}
                interestInput={interestInput}
                setInterestInput={setInterestInput}
                handleDeleteChip={handleDeleteChip}
                handleInterestKeyDown={handleInterestKeyDown}
            />
        </div>
    </ProtectedProfile>
  );
}
