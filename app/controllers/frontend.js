//export the following when module gets required
module.exports = {
    //if this function is called, render the 'home' view and pass title = "home" as object
    home: function(request, response){
        return response.status(200).render('home', {
            title: "CyberPatient"
        });
    },
    visualization: function(req, res){
        return res.status(200).render('visualization', {
            title:"visualization"
        });
    }
}