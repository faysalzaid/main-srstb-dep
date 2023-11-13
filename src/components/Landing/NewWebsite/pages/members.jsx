import React, { useEffect } from "react";
import "../../../../assets/styles/layla.css";
import MembersBox from "../../nComponents/membersBox";
import Navbar from "../../nComponents/navbar";
import Footer from "../../nComponents/footer";
function Members() {
	useEffect(() => {
		document.title = "Members";
	});
	return (
		<>
			<Navbar />
			<div className="max-w-[1240px] mx-auto">
				<h2 className="text-center font-bold text-2xl block border-b-4 border-orange-500 my-4">
					Members Of The SRS-Road Bureau Council
				</h2>
				<div className="flex flex-wrap items-center justify-center gap-4 mx-4">
                    <MembersBox
                        name="Member Name"
                        role="Role of the Member"
                        about="About the Member"
                    />
				</div>
			</div>

			<Footer />
		</>
	);
}

export default Members;
