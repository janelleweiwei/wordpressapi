
text/css gridsystem.css ( ASCII C program text )
.grid {
	/*padding: 2em;*/
	display:grid;
	--grid-gap: 1em;
	grid-template-columns: repeat(12,1fr);
}

.grid-10 {
	grid-template-columns: repeat(10,1fr);
}

.grid.gap {
	grid-gap:var(--grid-gap);
	gap:var(--grid-gap);
}

.gap.large { --grid-gap:2em; }
.gap.small { --grid-gap:0.5em; }

/* LAYOUT GRID SYSTEM */
.col-0 { display:none; }
.col-1 { grid-column: span 1; }
.col-2 { grid-column: span 2; }
.col-3 { grid-column: span 3; }
.col-4 { grid-column: span 4; }
.col-5 { grid-column: span 5; }
.col-6 { grid-column: span 6; }
.col-7 { grid-column: span 7; }
.col-8 { grid-column: span 8; }
.col-9 { grid-column: span 9; }
.col-10 { grid-column: span 10; }
.col-11 { grid-column: span 11; }
.col-12 { grid-column: span 12; }

/* Extra Small Size */
@media (min-width: 0) {
	.col-xs-1 { grid-column: span 1; }
	.col-xs-2 { grid-column: span 2; }
	.col-xs-3 { grid-column: span 3; }
	.col-xs-4 { grid-column: span 4; }
	.col-xs-5 { grid-column: span 5; }
	.col-xs-6 { grid-column: span 6; }
	.col-xs-7 { grid-column: span 7; }
	.col-xs-8 { grid-column: span 8; }
	.col-xs-9 { grid-column: span 9; }
	.col-xs-10 { grid-column: span 10; }
	.col-xs-11 { grid-column: span 11; }
	.col-xs-12 { grid-column: span 12; }
}

/* Small Size */
@media (min-width: 320px) {
	.col-sm-1 { grid-column: span 1; }
	.col-sm-2 { grid-column: span 2; }
	.col-sm-3 { grid-column: span 3; }
	.col-sm-4 { grid-column: span 4; }
	.col-sm-5 { grid-column: span 5; }
	.col-sm-6 { grid-column: span 6; }
	.col-sm-7 { grid-column: span 7; }
	.col-sm-8 { grid-column: span 8; }
	.col-sm-9 { grid-column: span 9; }
	.col-sm-10 { grid-column: span 10; }
	.col-sm-11 { grid-column: span 11; }
	.col-sm-12 { grid-column: span 12; }
}

/* Medium Size */
@media (min-width: 600px) {
	.col-md-1 { grid-column: span 1; }
	.col-md-2 { grid-column: span 2; }
	.col-md-3 { grid-column: span 3; }
	.col-md-4 { grid-column: span 4; }
	.col-md-5 { grid-column: span 5; }
	.col-md-6 { grid-column: span 6; }
	.col-md-7 { grid-column: span 7; }
	.col-md-8 { grid-column: span 8; }
	.col-md-9 { grid-column: span 9; }
	.col-md-10 { grid-column: span 10; }
	.col-md-11 { grid-column: span 11; }
	.col-md-12 { grid-column: span 12; }
}

/* Large Size */
@media (min-width: 900px) {
	.col-lg-1 { grid-column: span 1; }
	.col-lg-2 { grid-column: span 2; }
	.col-lg-3 { grid-column: span 3; }
	.col-lg-4 { grid-column: span 4; }
	.col-lg-5 { grid-column: span 5; }
	.col-lg-6 { grid-column: span 6; }
	.col-lg-7 { grid-column: span 7; }
	.col-lg-8 { grid-column: span 8; }
	.col-lg-9 { grid-column: span 9; }
	.col-lg-10 { grid-column: span 10; }
	.col-lg-11 { grid-column: span 11; }
	.col-lg-12 { grid-column: span 12; }
}

/* Extra Large Size */
@media (min-width: 1200px) {
	.col-xl-1 { grid-column: span 1; }
	.col-xl-2 { grid-column: span 2; }
	.col-xl-3 { grid-column: span 3; }
	.col-xl-4 { grid-column: span 4; }
	.col-xl-5 { grid-column: span 5; }
	.col-xl-6 { grid-column: span 6; }
	.col-xl-7 { grid-column: span 7; }
	.col-xl-8 { grid-column: span 8; }
	.col-xl-9 { grid-column: span 9; }
	.col-xl-10 { grid-column: span 10; }
	.col-xl-11 { grid-column: span 11; }
	.col-xl-12 { grid-column: span 12; }
}

img {
 /* width: 100%;*/
  height: 390px;
}

.logoimg {
 /* width: 100%;*/
  height: 150px;
}

.row:after {
  content: "";
  clear: both;
  display: table;
}

[class*="col-"] {
  float: left;
  padding: 15px;
}

@media only screen and (min-width: 600px) {
  .col-s-1 {width: 8.33%;}
  .col-s-2 {width: 16.66%;}
  .col-s-3 {width: 25%;}
  .col-s-4 {width: 33.33%;}
  .col-s-5 {width: 41.66%;}
  .col-s-6 {width: 50%;}
  .col-s-7 {width: 58.33%;}
  .col-s-8 {width: 66.66%;}
  .col-s-9 {width: 75%;}
  .col-s-10 {width: 83.33%;}
  .col-s-11 {width: 91.66%;}
  .col-s-12 {width: 100%;}
}

@media only screen and (min-width: 768px) {
  .col-1 {width: 8.33%;}
  .col-2 {width: 16.66%;}
  .col-3 {width: 25%;}
  .col-4 {width: 33.33%;}
  .col-5 {width: 41.66%;}
  .col-6 {width: 50%;}
  .col-7 {width: 58.33%;}
  .col-8 {width: 66.66%;}
  .col-9 {width: 75%;}
  .col-10 {width: 83.33%;}
  .col-11 {width: 91.66%;}
  .col-12 {width: 100%;}
}