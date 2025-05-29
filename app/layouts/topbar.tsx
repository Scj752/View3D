import { 
	Form,
	Outlet,
} from "react-router";

import {
	SquareBackground,
	MultiSquaresBackground,
	ParticleBackground,
} from "./background";

export default function Topbar() {
	return (
	<>
	<div class="relative">
		<div class="z-100 fixed w-full top-0 bg-purple-100">
			<div class="flex justify-around h-20 p-6">
		        <h1 class="font-sans text-2xl font-bold">
		          <a href="/">View 3D</a>
		        </h1>
		    {/*</div>*/}
		    {/*<div>*/}
			        <Form>
					<svg class="w-10 h-10 l-2 absolute transparent-0.5 fill-gray-400" aria-hidden="true" viewBox="-2 -2 28 28">
				        <g>
				            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
				        </g>
			   		</svg>
			          	
			            <input
			            	placeholder="Search"
			          		class="
			          			border-solid border-transparent border-2 w-80 h-10 pl-10
			          			outline-none overflow-hidden bg-[#F3F3F3] rounded-[10px] transition-[0.5s] 
				          		
				          		hover:border-2 
				          		hover:border-[#4A9DEC] 
				          		hover:shadow-[0_0_0_7px_rgba(74,157,236,20%)] 
				          		hover:bg-white
				          		focus:border-2 
				          		focus:border-[#4A9DEC] 
				          		focus:shadow-[0_0_0_7px_rgba(74,157,236,20%)] 
				          		focus:bg-white"
			            />
			          </Form>
			{/*</div>*/}
			{/*<div>*/}
			          <Form>
			            <button class="btn-primary" type="button"><i class="fa fa-upload"> Upload</i></button>
			          </Form>
			</div>
		</div>
	</div>
	<div>
	<Outlet />
	</div>
	</>
    );
}