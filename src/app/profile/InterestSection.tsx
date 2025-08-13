import BorderColorIcon from '@mui/icons-material/BorderColor';
import Chip from '@mui/material/Chip';

export default function InterestsSection({
  interests,
  isEditInterest,
  onEditInterest,
  tempChips,
  interestInput,
  setInterestInput,
  handleDeleteChip,
  handleInterestKeyDown,
}) {
  return (
    <>
      {!isEditInterest ? (
        <div className="bg-white/20 p-4 rounded-md mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg">Interest</p>
            <button
              type="button"
              className="text-gray-400"
              onClick={onEditInterest}
            >
              <BorderColorIcon />
            </button>
          </div>
          {interests && interests.length > 0 ? (
             // Populated view
            <div className="flex flex-wrap gap-2 mt-4">
              {interests.map((interest, index) => (
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
         // Edit Interest Mode
        <>
          <p className="text-yellow-200 text-xs">Tell everyone about yourself</p>
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
    </>
  );
}

        // {!isEditInterest ? (
        // <div className="bg-white/20 p-4 rounded-md mb-6">
        //     <div className="flex justify-between items-center mb-2">
        //     <p className="text-lg">Interest</p>
        //     <button
        //         type="button"
        //         className="text-gray-400"
        //         onClick={handleEditInterest}
        //     >
        //         <BorderColorIcon />
        //     </button>
        //     </div>
        //       {profile.interests && profile.interests.length > 0 ? (
        //         // Populated view
        //         <div className="flex flex-wrap gap-2 mt-4">
        //         {profile.interests.map((interest, index) => (
        //             <Chip
        //             key={index}
        //             label={interest}
        //             sx={{
        //                 backgroundColor: 'rgba(0,0,0,0.5)',
        //                 color: 'white',
        //                 fontSize: '0.75rem',
        //             }}
        //             />
        //         ))}
        //         </div>
        //     ) : (
        //         // Empty view
        //         <p className="text-sm mt-4">
        //         Add in your interests to find a better match
        //         </p>
        //     )}
        // </div>
        // ) : (
        //     // Edit Interest Mode
        // <>
        //     <p className="text-yellow-200 text-xs">
        //     Tell everyone about yourself
        //     </p>
        //     <p className="text-lg">What interests you?</p>
        //     <div className="bg-white/20 p-3 rounded-md mt-6 flex flex-wrap gap-1 items-center">
        //         {tempChips.map((chip, i) => (
        //             <Chip
        //             key={i}
        //             label={chip}
        //             onDelete={() => handleDeleteChip(chip)}
        //             sx={{
        //                 backgroundColor: "rgba(0,0,0,0.5)",
        //                 color: "white",
        //                 fontSize: "0.75rem",
        //                 "& .MuiChip-deleteIcon": {
        //                 color: "rgba(255, 255, 255, 0.89)",
        //                 },
        //             }}
        //             />
        //         ))}

        //         <input
        //             type="text"
        //             value={interestInput}
        //             onChange={(e) => setInterestInput(e.target.value)}
        //             onKeyDown={handleInterestKeyDown}
        //             placeholder=""
        //             className="bg-transparent outline-none text-white flex-1 min-w-[120px]"
        //         />
        //     </div>
        // </>
        // )}
