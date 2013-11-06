How to use it:

- Copy repo-stl-preview.jar to the classpath (such as webapps/alfresco/WEB-INF/lib)
- Copy share-stl-preview.jar to the classpath (such as webapps/share/WEB-INF/lib)
- Restart Alfresco
- Upload STL files to the document library
- Click to details, to see the WebPreview 

TODO
- Convert this project over to an Alfresco AMP for the Share and Repo tiers

hints:
- This project relies on the jsc3d STL Renderer framework: https://code.google.com/p/jsc3d/

- How to avoid overloading of: org/alfresco/components/preview/web-preview.get.config.xml, see: 
https://github.com/share-extras/media-viewers/blob/master/config/webscripts/org/sharextras/customization/media-previews/pdfjs-config-experimental/web-preview.get.js

This code was developed at the Alfresco Summit hack-a-thon 2013 Barcelona by 
Vitali Belenki and Erik Kirs