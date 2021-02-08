//
//  TMapShow.swift
//  TMapSwift
//
//  Created by Joseph Kim on 2021/01/14.
//

import UIKit
import TMapSDK

/* class TMapShow: UIView {
  @objc var count = 0 {
    didSet {
      button.setTitle(String(describing: count), for: .normal)
    }
  }
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.addSubview(button)
    increment()
  }
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  lazy var button: UIButton = {
    let b = UIButton.init(type: UIButton.ButtonType.system)
    b.titleLabel?.font = UIFont.systemFont(ofSize: 50)
    b.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    b.addTarget(
      self,
      action: #selector(increment),
      for: .touchUpInside
    )
    return b
  }()
  @objc func increment() {
    count += 1
  }
} */

class TMapShow: UIView, TMapViewDelegate {
   
    var mapView: TMapView?
    var marker: TMapMarker?
    var markers: [TMapMarker] = []
  let mPosition: CLLocationCoordinate2D = CLLocationCoordinate2D.init(latitude: 37.5111168, longitude: 126.7107574)
    let zoom = 16
    let apiKey:String = "API_KEY"
    
    
    override init(frame: CGRect) {
        
        super.init(frame: frame)
        self.backgroundColor = .white
        setupView()
//        setupConstraints()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemente")
    }
    
    func SKTMapApikeySucceed() {
        self.mapView?.setCenter(mPosition)
        self.mapView?.setZoom(zoom)
        
        
        let marker = TMapMarker(position: mPosition)
        marker.title = "제목없음"
        marker.subTitle = "내용없음"
        marker.draggable = true
        let label = UILabel(frame: CGRect(x: 0, y: 0, width: 30, height: 50))
        label.text = "좌측"
        marker.leftCalloutView = label
        let label2 = UILabel(frame: CGRect(x: 0, y: 0, width: 30, height: 50))
        label2.text = "우측"
        marker.rightCalloutView = label2
        
        marker.map = self.mapView
        self.markers.append(marker)
        
        
        let pathData = TMapPathData()
        pathData.requestFindNameAroundPOI(mPosition, categoryName:"EV충전소", radius: 100, count: 20) { (result, error)->Void in
                    if let result = result {
                        DispatchQueue.main.async {
                            for poi in result {
                                let marker = TMapMarker(position: poi.coordinate!)
                                marker.map = self.mapView
                                marker.title = poi.name
                                self.markers.append(marker)
                                self.mapView?.fitMapBoundsWithMarkers(self.markers)
                            }
                        }
                    }
        }
    }
    
    func setupView() {
        contentView.subviews.forEach { $0.removeFromSuperview() }
        self.mapView = TMapView (frame: contentView.frame)
        self.mapView?.delegate = self
        self.mapView?.setApiKey(apiKey)
        
        
        contentView.addSubview(self.mapView!)
        
        
        
        
        self.addSubview(contentView)
    }
    
    
    func setupConstraints() {
        self.translatesAutoresizingMaskIntoConstraints = false
        contentView.translatesAutoresizingMaskIntoConstraints = false
        contentView.leftAnchor.constraint(equalTo: self.leftAnchor, constant: 10).isActive = true
        contentView.topAnchor.constraint(equalTo: self.safeAreaLayoutGuide.topAnchor, constant: 20).isActive = true
        contentView.rightAnchor.constraint(equalTo: self.rightAnchor, constant: -10).isActive = true
        contentView.bottomAnchor.constraint(equalTo: self.centerYAnchor, constant: 300).isActive = true
    }
    
    let contentView: UIView = {
        let view = UIView(frame: CGRect(x: 0, y: 0, width: 500, height: 500))
        view.layer.borderWidth = 1.0
        view.layer.borderColor = UIColor.lightGray.cgColor
        return view
    }()
}
