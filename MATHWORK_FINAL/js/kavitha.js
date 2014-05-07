 $(document).ready(function() {
  
// Variable data to hold the submitted code
var lines = [];
var linesinfo = [];
var previousSelectedLineId = [];   
     
var info = ["#classname", "#propertyname", "#functionname"];
     
    
// Object to hold the useful information extracted from line
function ExtractInfoHolder(info, linenum, typeid)
{
   this.info = info;    
   this.linenum = linenum;
   this.typeid = typeid;
}     

function processLine(linecode, linenum)
{
    extractedinfo = new ExtractInfoHolder(linecode, linenum, 0);
    
if((linecode.search("public") > -1) || (linecode.search("private") > -1) || (linecode.search("protected") > -1))
            {
              if(linecode.search("class") > -1)
              {
                // Line contains class name 
                  extractedinfo.typeid = 1;
                  
                  var classname = linecode.split("{", 1) + ";";
                  extractedinfo.info = classname;

              }
              else if(linecode.search(";") > -1)
              {
                // Line contains property name 
                  extractedinfo.typeid = 2;
              }   
              else
              {
                // Line contains function name
                  extractedinfo.typeid = 3;
                  
                // Remove "{" and unnecessary string from function name 
                  var funcname = linecode.split("{", 1) + ";";
                  extractedinfo.info = funcname;
              }

            }
    
    return extractedinfo;
}
   
     
   
// Utility functions to split the text 
function splitText(index, text) {
    var temp = text,
    multiLineText = temp.split('\n');
    return multiLineText[index - 1];
}
function numberOfLines(source) {
    return source.split('\n').length;
}
     
     
     
     
// Utility function to hide or clear the form for the next submission     
$('#myButton').on('click', function() {
    
   
    debugger;
    var totalLines, text;
    
    textAreaValue = $('#text').val();
    totalLines = numberOfLines(textAreaValue); 
    
    alert("Number of lines in code" + totalLines);
    for(i = 1; i <= totalLines; i++) { 
        
         lines.push( splitText( i, $('#text').val() ) );         
         var linecode = splitText(i, $('#text').val());        
        
         // Add the line to code section for display 
         $('#code').append('<span>' + i + "&nbsp;&nbsp;"+'</span>');
         $('#code').append('<span id='+i+'>' + linecode +'</span>'+'<br>');                 
                     
         //alert(linecode);
         // Analyze code to differentiate bettween Class / Function / Property Name 
         var extractedinfo = new processLine(linecode, i);
        // If useful information is not detected, continute to next line
         if(extractedinfo.typeid == 0)
         {
          continue;
         }
        
        // Create element in UML section and add click event listener
        jQuery('<div/>', {
                 id: i,                 
                 class: 'wrapper',
                 text: extractedinfo.info, //+ "   "  + extractedinfo.typeid, 
                 click: function(event) {
                      var id=$(this).attr('id');
                      var codeval = $('#code').find('#' + id);
           
                    //alert("Selfie = " + id); 
                    
                 // Set previously selected code to background
                  if(previousSelectedLineId.length > 0)
                    {
                     $('#'+ previousSelectedLineId[0]).css('background-color', 'white'); 
                     previousSelectedLineId = [];
                    }
               
                  // Highlight currently selected item and store current id for future use
                    $('#'+id).css('background-color', 'red');
                    previousSelectedLineId = id;
                      
                    } 
                }).appendTo(info[extractedinfo.typeid - 1]);   // select the tag type based on extracted information    
            }    
  
   // Hide the input text box and show results on top    
   $("#inputcode" ).hide();
   $('html, body').animate({ scrollTop: 0 }, 'slow');
  
 }); // Submit button click 
  
  
}); // onload



