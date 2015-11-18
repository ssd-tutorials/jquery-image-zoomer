var galleryObject = {
	idOverlay : 'ssdZoomOverlay_',
	idTrigger : 'ssdZoomTrigger_',
	classOverlay : 'ssdZoomOverLay',
	classActive : 'ssdZoomActive',
	thumbWidth : 0,
	thumbHeight : 0,
	imgPath : '',
	imgWidth : 0,
	imgHeight : 0,
	backgroundX : 0,
	backgroundY : 0,
	imageWindowX : 0,
	imageWindowY : 0,
	cursorImageX : 0,
	cursorImageY : 0,
	currentIndex : null,
	currentA : null,
	run : function(obj) {
		
		if (obj.length > 0) {
		
			jQuery.each(obj, function(k, v) {
				$(this).attr('id', galleryObject.idTrigger + k);
			});
			
			$('.' + galleryObject.classOverlay).live('mousemove click mouseout', function(event) {
			
				var ind = $(this).attr('id').split('_');
				galleryObject.currentIndex = ind[1];
				
				galleryObject.processImage($('#' + galleryObject.idTrigger + galleryObject.currentIndex).children('img'));
				
				galleryObject.runImage(event);
			
			});
			
			obj.find('img').live('mouseover', function(event) {
				
				galleryObject.currentA = $(this).parent('a');
				galleryObject.imgPath = galleryObject.currentA.attr('rel');
				
				var ind = galleryObject.currentA.attr('id').split('_');
				galleryObject.currentIndex = ind[1];
				
				galleryObject.processImage($(this));
				galleryObject.mouseOver(event);
				
				return false;
				
			});
		
		}
		
	},
	mouseOver : function(event) {
		
		if (
			!$('#' + galleryObject.idOverlay + galleryObject.currentIndex) ||
			!$('#' + galleryObject.idOverlay + galleryObject.currentIndex).hasClass(galleryObject.classActive)
		) {
		
			var objImage = new Image();
			
			objImage.onload = function() {
				
				galleryObject.imgWidth = objImage.width;
				galleryObject.imgHeight = objImage.height;
				
				galleryObject.updatePosition(event);
				
				var overLay = '<div class="' + galleryObject.classOverlay + '" ';
				overLay += 'id="' + galleryObject.idOverlay + galleryObject.currentIndex + '" ';
				overLay += 'style="background:url(' + galleryObject.imgPath + ') no-repeat 0 0;position:absolute;';
				overLay += 'width:' + galleryObject.thumbWidth + 'px;height:' + galleryObject.thumbHeight + 'px;';
				overLay += 'left:' + galleryObject.imageWindowX + 'px;top:' + galleryObject.imageWindowY + 'px;"></div>';
				
				galleryObject.currentA.after(overLay);
				
			};
			
			objImage.src = galleryObject.imgPath;
		
		}
		
		return false;
		
	},
	processImage : function(img) {
		
		var pos = img.offset();
		galleryObject.imageWindowX = pos.left;
		galleryObject.imageWindowY = pos.top;
		
		galleryObject.thumbWidth = img.width();
		galleryObject.thumbHeight = img.height();
		
	},
	runImage : function(event) {
		
		switch(event.type) {
			case 'mousemove':
			galleryObject.mouseMove(event);
			break;
			case 'click':
			galleryObject.mouseClick();
			break;
			case 'mouseout':
			galleryObject.mouseOut();
			break;
		}		
		
	},
	mouseMove : function(event) {
		
		if (!$('#' + galleryObject.idOverlay + galleryObject.currentIndex).hasClass(galleryObject.classActive)) {
		
			galleryObject.updatePosition(event);
			
			$('#' + galleryObject.idOverlay + galleryObject.currentIndex).css({
				'backgroundPosition' : '-' + galleryObject.backgroundX + 'px -' + 
				galleryObject.backgroundY + 'px'
			});
			
		}
		
	},
	updatePosition : function(event) {
	
		galleryObject.cursorWindowX = event.pageX;
		galleryObject.cursorWindowY = event.pageY;
		
		galleryObject.cursorImageX = galleryObject.cursorWindowX - 
			galleryObject.imageWindowX;
		galleryObject.cursorImageY = galleryObject.cursorWindowY - 
			galleryObject.imageWindowY;
			
		var percentX = (galleryObject.thumbWidth/(galleryObject.imgWidth - galleryObject.thumbWidth)) * 100;
		var percentY = (galleryObject.thumbHeight/(galleryObject.imgHeight - galleryObject.thumbHeight)) * 100;
		
		galleryObject.backgroundX = Math.round((galleryObject.cursorImageX / percentX) * 100);
		galleryObject.backgroundY = Math.round((galleryObject.cursorImageY / percentY) * 100);
	
	},
	mouseClick : function() {
	
		if ($('#' + galleryObject.idOverlay + galleryObject.currentIndex).hasClass(galleryObject.classActive)) {
		
			var objImage = new Image();
			objImage.src = $('#' + galleryObject.idTrigger + galleryObject.currentIndex).attr('rel');
			
			galleryObject.imgWidth = objImage.width;
			galleryObject.imgHeight = objImage.height;
			
			$('#' + galleryObject.idOverlay + galleryObject.currentIndex).removeClass(galleryObject.classActive);
		
		} else {
			$('#' + galleryObject.idOverlay + galleryObject.currentIndex).addClass(galleryObject.classActive);
		}
		
		return false;
	
	},
	mouseOut : function() {
	
		if (!$('#' + galleryObject.idOverlay + galleryObject.currentIndex).hasClass(galleryObject.classActive)) {
			
			$('#' + galleryObject.idOverlay + galleryObject.currentIndex).remove();
			
		}
	
	}
	
};
$(function() {

	galleryObject.run($('#gallery a'));

});




