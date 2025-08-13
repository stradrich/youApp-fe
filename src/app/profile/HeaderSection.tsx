import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function HeaderSection({ username, isEditInterest, onSaveInterests }) {
  return (
    <div className="flex mb-5 justify-between">
      <a href={isEditInterest ? "/profile" : "/"}>
        <ArrowBackIosIcon />
      </a>
      {!isEditInterest ? (
        <span>@{username}</span>
      ) : (
        <button
          type="button"
          className="text-blue-400 text-sm"
          onClick={onSaveInterests}
        >
          Save
        </button>
      )}
      {!isEditInterest && <MoreHorizIcon />}
    </div>
  );
}

        // {!isEditInterest ? (
        //         <>
        //         <div className="flex mb-5 justify-between">
        //             <a href="/">
        //                 <ArrowBackIosIcon />
        //             </a>
        //                 <span>@{profile.username}</span>
        //             <MoreHorizIcon />
        //         </div>
        //         </>
        //     ) : (
        //         <>
        //           <div className="flex mb-5 justify-between">
        //             <a href="/profile">
        //                 <ArrowBackIosIcon />
        //             </a>
        //             <button
        //                 type="button"
        //                 className="text-blue-400 text-sm"
        //                 onClick={handleSaveInterests}
        //             >
        //                 Save
        //             </button>
        //           </div>
        //         </>
        // )}
