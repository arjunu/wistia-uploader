function wistiaUploaderController($scope, $element, $attrs) {
    var ctrl = this;

    ctrl.progress = {
        show: true,
        percent: 0
    };

    ctrl.error = {
        show: true,
        message: "failed to upload"
    };

    ctrl.player = {
        show: true,
        id: "123"
    };

    // this.$postLink = function () {
        //add event listener to an element
        var $input = $element.find('input.fileupload');

        $input.fileupload({
            dataType: "json",
            add: function (e, data) {
                ctrl.error.show = false;
                ctrl.player.show = false;
                ctrl.progress.show = true;
                data.submit();
                $scope.$apply();
            },
            done: function (e, data) {
                var hash = "wistia_" + data.result.hashed_id;
                ctrl.player.id = hash;
                ctrl.player.show = true;
                Wistia.embed(hash);
                $scope.$apply();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(jqXHR, textStatus, errorThrown)
                ctrl.error.message = errorThrown;
                ctrl.error.show = true;
                $scope.$apply();
            },
            progress: function (e, data) {
                ctrl.progress = parseInt(data.loaded / data.total * 100, 10);
                $scope.$apply();
            }
        });

    // };
}

angular.module('processStreet').component('wistiaUploader', {
    templateUrl: './components/wistia-uploader.html',
    bindings: {
        input: '@'
    },
    controller: wistiaUploaderController
});