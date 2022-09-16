import React from 'react';
import { Link} from 'react-scroll';

export default function Side (){
return (
    <div>
        <Link to="1" spy={true} smooth={true}>
            <span>Day 1</span>
        </Link>
        <br />
        <Link to="2" spy={true} smooth={true}>
            <span>Day 2</span>
        </Link>
        <br />
        <Link to="3" spy={true} smooth={true}>
            <span>Day 3</span>
        </Link>
        <br />
        <Link to="4" spy={true} smooth={true}>
            <span>Day 4</span>
        </Link>
    </div>
);
};
