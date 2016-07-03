<?php include("source/head.php"); ?>
<script type="text/javascript" src="js/practice.js"></script>

<!-- Body 的 rel 可以放現在在哪一頁-->
<body rel="index">
	<div class="content-wrapper">
		<section class="park-info">
			<div class="bg-color-top">
				<div class="center-content">
					<h1 datakey="title"></h1>
					<h3 datakey="description"></h3>
				</div>
			</div>
			<div class="center-content" style="margin-top:-60px;">
				<div class="card">
					<div><i class="fa fa-map-marker"></i> <span datakey="address"></span></div>
					<div><i class="fa fa-phone"></i> <span datakey="tel"></span></div>
				</div>
			</div>
		</section>
		<section>
			<div class="center-content">
				<div class="card">
					<h3>園區介紹</h3>
					<div class="area-list"><!--HTML IN TEMPLATE--></div>
				</div>
			</div>
		</section>
		<section class="full-overlay">
			<div class="leave-overlay"><i class="fa fa-times"></i></div>
			<div class="center-content overlay-content"></div>
		</section>
	</div>


	<!-- UI Tempalte for list items-->
	<div class="web-ui-template">
		<div class="area-list-item">
			<div class="banner click-item"><img datakey="img" datapos="src" src=""/></div>
			<div class="padding-8">
				<div class="like-wrap" datakey="ID" datapos="rel"><i class="fa fa-heart"></i> <span datakey="favicount">123</span></div>
				<h4 datakey="title" class="click-item"></h4>
				<div datakey="description"></div>
			</div>
		</div>

		<div class="area-info">
			<div class="area-info-main">
				<div class="banner"><img datakey="img" datapos="src" src=""/></div>
				<div class="padding-16">
					<div class="like-wrap" datakey="ID" datapos="rel"><i class="fa fa-heart"></i> 123</div>
					<h3><span datakey="title"></span></h3>
					<div datakey="description"></div>
				</div>
			</div>
			<div class="animals-list"><!--HTML IN TEMPLATE--></div>
		</div>

		<div class="animal-list-item">
			<div class="banner"><img datakey="img" datapos="src" src=""/></div>
			<div class="padding-8" datakey="title"></div>
		</div>
	</div>
</body>

</html>