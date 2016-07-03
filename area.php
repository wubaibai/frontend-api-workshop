<?php include("source/head.php"); ?>
<script type="text/javascript" src="js/demo.js"></script>

<!-- Body 的 rel 可以放現在在哪一頁-->
<body rel="area">
	<div class="content-wrapper">
		<section>
			<div class="center-content">
				<div class="card single-area"></div>
			</div>
		</section>
	</div>

	<!-- UI Tempalte for list items-->
	<div class="web-ui-template">
		<div class="area-info">
			<div class="area-info-main">
				<div class="banner"><img datakey="img" datapos="src" src=""/></div>
				<div class="padding-16">
					<div class="like-wrap" datakey="ID" datapos="rel"><i class="fa fa-heart"></i> <span datakey="faviCount"></span></div>
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