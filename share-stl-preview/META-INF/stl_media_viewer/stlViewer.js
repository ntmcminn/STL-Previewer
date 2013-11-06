/**
 * This is the "WebPreviewer" plugin (one of many plugins to
 * "Alfresco.WebPreview") used to display multi paged documents (i.e. text, word
 * or pdf documents) that has a "webpreview" thumbmail, in other words a .swf
 * movie created by the "pdf2swf" utility.
 *
 * Supports the following thumbnails: "webpreview"
 * 
 * @param wp
 *            {Alfresco.WebPreview} The Alfresco.WebPreview instance that
 *            decides which plugin to use
 * @param attributes
 *            {Object} Arbitrary attributes brought in from the <plugin> element
 */
if (Alfresco.WebPreview) {
	Alfresco.WebPreview.prototype.Plugins.STLViewer = function(
			wp, attributes) {
		this.wp = wp;
		this.attributes = YAHOO.lang.merge(Alfresco.util
				.deepCopy(this.attributes), attributes);
		this.viewerDiv = null;

		STLViewerJSObj = this;
		return this;
	};

	Alfresco.WebPreview.prototype.Plugins.STLViewer.prototype = {
		/**
		 * Attributes
		 */
		attributes : {
			src : null,
			paging : "false",

			/**
			 * Decides if previewers shall disable the i18n input fix all
			 * browsers. If it shall be disabled for certain a certain
			 * os/browser override the disableI18nInputFix() method.
			 * 
			 *
			 * @property disableI18nInputFix
			 * @type boolean
			 */
			disableI18nInputFix : "false",
			showFullScreenButton : "true",
			showFullWindowButton : "true"
			
			
		},

		/**
		 * Reference to the div in which the 3d model view is placed.
		 * 
		 * @type HTMLElement
		 * @private
		 */
		viewerDiv : null,

		/**
		 * Tests if the plugin can be used in the users browser.
		 * 
		 * @method report
		 * @return {String} Returns nothing if the plugin may be used, otherwise
		 *         returns a message containing the reason it cant be used as a
		 *         string.
		 * @public
		 */
		report : function STLViewer_report() {

			if (Alfresco.logger.isDebugEnabled()) {
				Alfresco.logger
						.debug("** Show STLViewer Player");
            }
		},

		/**
		 * Display the node.
		 * 
		 * @method display
		 * @public
		 */
		display : function STLViewer_display() {

			this.displaySTLViewer();
		},
        /**
         * Displays STL viewer
         *
         * @method displaySTLViewer
         * @public
         */
		displaySTLViewer : function STLViewer_displaySTLViewer() {
            var divId = this.wp.id + "-full-window-div";
            var canvasId = divId + "-cv";
            //Generate the div element to display a viewer
            if (!this.viewerDiv) {
                var elem = document.getElementById(this.wp.id + "-previewer-div");
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild);
                }
                this.viewerDiv = new YAHOO.util.Element(document
                                       .createElement("canvas"));
                this.viewerDiv.set("id", canvasId);
                this.viewerDiv.set("width", 832);
                this.viewerDiv.set("height", 670);
                this.viewerDiv.appendTo(elem);
			}
            //Initialize jsc3d
            var elDiv = document.getElementById(canvasId);
            var viewer = new JSC3D.Viewer(elDiv);
            //Get the node ref
            var nodeRefAsLink = this.wp.options.nodeRef.replace(":/", "");
            viewer.setParameter('SceneUrl',
                                Alfresco.constants.PROXY_URI_RELATIVE
                                + 'api/node/content/' + nodeRefAsLink + "/" + this.wp.options.name);
            viewer.setParameter('InitRotationX', 290);
            //viewer.setParameter('InitRotationY', 0);
            //viewer.setParameter('InitRotationZ', 0);
            //viewer.setParameter('ModelColor', '#CAA618');
            //viewer.setParameter('BackgroundColor1', '#FFFFFF');
            //viewer.setParameter('BackgroundColor2', '#383840');
            viewer.setParameter('RenderMode', 'smooth');
            viewer.init();
            viewer.update();
		},
		// Returns the alfresco webapp url
		getAlfWebappUrl : function STLViewer_getAlfWebappUrl() {
			var alf_host_url = Alfresco.constants.PROXY_URI.replace(
					Alfresco.constants.PROXY_URI_RELATIVE, "");

			// alf_host_url;

			var subStr = Alfresco.constants.PROXY_URI_RELATIVE.substring(0,
					Alfresco.constants.PROXY_URI_RELATIVE.lastIndexOf("/"))
			// subStr;

			var alfwebapp_startIndex = subStr.lastIndexOf("/");
			// alfwebapp_startIndex;

			var alf_webapp_name = Alfresco.constants.PROXY_URI_RELATIVE
					.substring(alfwebapp_startIndex);
			return alf_host_url + alf_webapp_name;

		}
    };
}

var STLViewerJSObj = null;