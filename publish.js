(function() {

    include('templates/lib/janl/mustache.js');

    publish = function(docSet, opts) {
        var out = '',
            templates = {
                index: readFile(BASEDIR + 'templates/default/tmpl/index.html')
            };
        
        function linkify () {
            return function(text, render) {
                // todo
                return render(text);
            }
        }
        
        function summarize (doclet) {
            var desc = doclet.description || '';
            desc = desc.replace(/<\/?p>/gi, ''); // full text may be HTML, remove P wrapper
            desc = trim(desc);
            
            var m;

            if ( m = /^([\s\S]+?)(?:\n|\r|\f|<br>|$)+([\s\S]*)$/.exec(desc) ) {
                doclet.summary = m[1];
                doclet.description = m[2]? m[2] : '';
            }
        }
        
        function trim(text) {
            return text.replace(/^\s+|\s+$/g, '');
        }
	    
	    // remove undocumented symbols from the output
	    docSet.doclets = docSet.doclets.filter(function(doclet) {
	        return !doclet.undocumented;
	    });
	    
	    // add template helpers
	    docSet.doclets.forEach(function(doclet) {
	        doclet['params?']   = doclet.params   && doclet.params.length > 0;
	        doclet['borrowed?'] = doclet.borrowed && doclet.borrowed.length > 0;
	        
	        summarize(doclet);
	    });
	    
	    docSet.sortByLongname();
	    
	    var partials = {
            param: readFile(BASEDIR + 'templates/default/tmpl/param.mustache'),
            returns: readFile(BASEDIR + 'templates/default/tmpl/returns.mustache')
        };
        
	    // apply template
        out = Mustache.to_html(
            templates.index,
            {
                docs: docSet.doclets,
                linkify: linkify
            },
            partials
        );

        if (opts.destination === 'console') {
            print(out);
        }
        else {
            print('The only -d destination option currently supported is "console"!');
        }
    }

})();