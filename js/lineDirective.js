var app = angular.module("treeApp");

app.directive('drawLine',  function($compile, $document) {
    return function (scope, element) {
		//rootElement = element;
	
        element.on('mousedown', function (e) {
            onMouseDown(e, element, scope);
        });
        element.on('mouseup', function (e) {
            onMouseUp(e);
        });

        element.on('mousemove', function (e) {
            onMouseMove(e, element);
        });		
    };

    var lineStartX = null;
	var lineStartY = null;
    var lineEndX = null;
	var lineEndY = null;
    var isDrawing = false;
	var startNode = null;
    //var selectedCells = [];
    //var previousDragged = null; */
	//var linkLine = null;

	function onKeyDown(e) {
		
		if(e.keyCode == 27) {
            endDrawLine();
        }
    };
	
    function onMouseDown(e, el, scope) {
	
		if (isDrawing)
			return;
	
	    var linkLine = angular.element('<div id="new-link-line"></div>');
		    
		lineStartY = e.pageY;//el[0].offsetTop; // + el[0].offsetWidth / 2
		lineStartX = e.pageX;//el[0].offsetLeft;// + el[0].offsetHeight / 2
		
		
		linkLine.css({
                'top': lineStartY + 'px',
				'left': lineStartX + 'px',
				'position': 'absolute',
				'width': '3px',
				'background-color': '#06a',
				'z-index': '100',
				'-webkit-transform-origin': 'top left',
				'-moz-transform-origin': 'top left',
				'-o-transform-origin': 'top left',
				'-ms-transform-origin': 'top left',
				'transform-origin': 'top left'
            });
		
		$compile(linkLine)(scope);
		el.append(linkLine);
		
		isDrawing = true;
		startNode = e.target;
    };

    function onMouseUp(e) {

	// TODO: проверки на элемент под мышкой
	
	/* if (!isRightClick(e) && e.target === startNode)
		return false;
	
	
		lineEndY = e.pageY;
		lineEndX = e.pageX;
	
		isDrawing = false; */
    };

	function onMouseMove(e, rootElement) {
	
	if (!isDrawing)
		return;
	
	var linkLine = angular.element(document.getElementById('new-link-line'));//$document.find('new-link-line');
	
    if(linkLine == null || linkLine == undefined || linkLine.length <= 0) 
		return;
	
     //var originX = //rootElement[0].offsetLeft ;//+ rootElement[0].offsetWidth / 2;
     //var originY = //rootElement[0].offsetTop; //+ rootElement[0].offsetHeight / 2;
        
     var length = Math.sqrt((e.pageX - lineStartX) * (e.pageX - lineStartX) 
            + (e.pageY - lineStartY) * (e.pageY - lineStartY));
    
    var angle = 180 / 3.1415 * Math.acos((e.pageY - lineStartY) / length);
    if(e.pageX > lineStartX)
            angle *= -1;
    
        linkLine.css({
			'height': length + 'px',
			'-webkit-transform': 'rotate(' + angle + 'deg)',
			'-moz-transform': 'rotate(' + angle + 'deg)',
			'-o-transform': 'rotate(' + angle + 'deg)',
			'-ms-transform': 'rotate(' + angle + 'deg)',
			'transform': 'rotate(' + angle + 'deg)'			
		});
        //    .css('height', length)
        //    .css('-webkit-transform', 'rotate(' + angle + 'deg)')
        //    .css('-moz-transform', 'rotate(' + angle + 'deg)')
        //    .css('-o-transform', 'rotate(' + angle + 'deg)')
        //    .css('-ms-transform', 'rotate(' + angle + 'deg)')
        //    .css('transform', 'rotate(' + angle + 'deg)');
    
	};
	
	function endDrawLine(){
		isDrawing = false;
	};
	
	function isRightClick(e) {
        if (e.which) {
            return (e.which == 3);
        } else if (e.button) {
            return (e.button == 2);
        }
        return false;
    }
});